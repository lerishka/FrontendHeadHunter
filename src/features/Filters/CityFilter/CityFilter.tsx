import { Select } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import { setCityId } from "../../../store/vacanciesSlice";
import type { RootState } from "../../../store";
import styles from "./CityFilter.module.scss";

export default function CityFilter() {
  const dispatch = useTypedDispatch();
  const cityId = useTypedSelector(
    (state: RootState) => state.vacancies.filters.cityId
  );

  const cities = [
    { value: "all", label: "Все города" },
    { value: "1", label: "Москва" },
    { value: "2", label: "Санкт-Петербург" },
  ];

  return (
    <div className={styles.cityFilterWrapper}>
      <Select
        data={cities}
        leftSection={<IconMapPin size={16} color={"#B1B1B2"} stroke={2.5} />}
        value={cityId}
        onChange={(val) => {
          if (val !== null) {
            dispatch(setCityId(val));
          }
        }}
      />
    </div>
  );
}
