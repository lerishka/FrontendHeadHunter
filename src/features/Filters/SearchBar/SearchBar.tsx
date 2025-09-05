import Input from "../../../ui/Input/Input";
import Button from "../../../ui/Button/Button";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import { setSearchText } from "../../../store/vacanciesSlice";
import { IconSearch } from "@tabler/icons-react";
import type { RootState } from "../../../store";
import { useState } from "react";
import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  const dispatch = useTypedDispatch();
  const searchText = useTypedSelector(
    (state: RootState) => state.vacancies.filters.searchText
  );
  const [text, setText] = useState(searchText);

  const handleUpdateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSearch = () => {
    const cleaned = text.trim();
    if (!cleaned) return;
    dispatch(setSearchText(cleaned));
    setText("");
  };

  return (
    <div className={styles.searchBarWrapper}>
      <Input
        leftSection={<IconSearch size={18} color={"#B1B1B2"} stroke={2.5} />}
        placeholder="Должность или название компании"
        size="md"
        radius={8}
        className={styles.input}
        onChange={handleUpdateSearch}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
        value={text}
      />
      <Button size="md" onClick={handleSearch}>
        Найти
      </Button>
    </div>
  );
}
