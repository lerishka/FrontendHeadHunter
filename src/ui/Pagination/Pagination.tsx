import { Pagination as MantinePagination } from "@mantine/core";
import { Group } from "@mantine/core";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { setPage } from "../../store/vacanciesSlice";
import type { RootState } from "../../store";

export default function Pagination() {
  const dispatch = useTypedDispatch();
  const page = useTypedSelector(
    (state: RootState) => state.vacancies.filters.page
  );

  return (
    <div>
      <MantinePagination.Root
        total={10}
        value={page}
        onChange={(newPage) => dispatch(setPage(newPage))}
        styles={(theme) => ({
          control: {
            border: `1px solid ${theme.colors.gray[1]}`,
          },
        })}
      >
        <Group gap={5} justify="center">
          <MantinePagination.First />
          <MantinePagination.Previous />
          <MantinePagination.Items />
          <MantinePagination.Next />
          <MantinePagination.Last />
        </Group>
      </MantinePagination.Root>
    </div>
  );
}
