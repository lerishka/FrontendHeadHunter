import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { VacancyCard, WorkFormat } from "../types/types";

type VacanciesFilters = {
  searchText: string;
  cityId: string;
  skills: string[];
  page: number;
};

type VacanciesState = {
  vacancies: VacancyCard[];
  status: string;
  error: string | null;
  filters: VacanciesFilters;
};

const initialState: VacanciesState = {
  vacancies: [],
  status: "",
  error: "",
  filters: {
    searchText: "",
    cityId: "all",
    skills: ["React", "Vue", "Svelte"],
    page: 1,
  },
};

export const fetchVacancies = createAsyncThunk<
  VacancyCard[],
  void,
  { state: RootState; rejectValue: string }
>(
  "vacancies/fetchVacancies",
  async function (_, { getState, rejectWithValue }) {
    try {
      const { filters } = getState().vacancies;
      const { searchText, cityId, skills, page } = filters;

      const params = new URLSearchParams();
      const urlParts = [];
      if (searchText) urlParts.push(searchText);
      if (skills.length) urlParts.push(...skills);

      const queryText = urlParts.join(" OR ");
      console.log(queryText);

      if (queryText) params.append("text", queryText);
      if (!(cityId === "all")) {
        params.append("area", cityId);
      } else {
        params.delete("area");
      }
      params.append("page", page.toString());
      params.append("per_page", "10");

      const url = `https://api.hh.ru/vacancies?${params.toString()}`;
      console.log(url);

      const responce = await fetch(url);

      if (!responce.ok) {
        throw new Error("Server Error!");
      }

      const data: { items: VacancyCard[] } = await responce.json();
      const transformedData: VacancyCard[] = data.items.map((item: any) => {
        const workFormat: WorkFormat[] = item.work_format?.length
          ? item.work_format.map((format: any) => format.id as WorkFormat)
          : [];

        return {
          id: item.id,
          name: item.name,
          salaryFrom: item.salary?.from,
          salaryTo: item.salary?.to,
          currency: item.salary?.currency,
          experience: item.experience?.name,
          company: item.employer.name,
          workFormats: workFormat,
          city: item.area.name,
          directLink: item.alternate_url,
        };
      });

      return transformedData;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown Error");
    }
  }
);

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.filters.searchText = action.payload;
      state.filters.page = 1;
    },

    setCityId(state, action: PayloadAction<string>) {
      state.filters.cityId = action.payload;
      state.filters.page = 1;
    },

    setSkills(state, action: PayloadAction<string[]>) {
      state.filters.skills = action.payload;
      state.filters.page = 1;
    },

    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(
        fetchVacancies.fulfilled,
        (state, action: PayloadAction<VacancyCard[]>) => {
          state.status = "resolved";
          state.vacancies = action.payload;
        }
      )

      .addCase(fetchVacancies.rejected, (state, action) => {
        (state.status = "rejected"),
          (state.error = action.payload ?? "Unknown Error");
      });
  },
});

export const { setSearchText, setCityId, setSkills, setPage } =
  vacanciesSlice.actions;
export default vacanciesSlice.reducer;
