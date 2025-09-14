import { configureStore } from "@reduxjs/toolkit";
import vacanciesReducer from "./vacanciesSlice";
import { vacanciesApi } from "../services/vacanciesApi";

export const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
    [vacanciesApi.reducerPath]: vacanciesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vacanciesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
