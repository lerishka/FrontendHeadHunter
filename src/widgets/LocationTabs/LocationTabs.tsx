import { Tabs } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/redux";

export const LocationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filters } = useTypedSelector((state) => state.vacancies);

  const tab = location.pathname.includes("petersburg")
    ? "petersburg"
    : "moscow";

  const handleSelectTab = (value: string | null) => {
    const searchParams = new URLSearchParams();
    if (filters.searchText) searchParams.set("searchText", filters.searchText);
    if (filters.skills.length)
      searchParams.set("skills", filters.skills.join(","));
    searchParams.set("page", "1");

    navigate(`/vacancies/${value}?${searchParams.toString()}`);
  };

  return (
    <Tabs value={tab} onChange={handleSelectTab}>
      <Tabs.List color="#4263EB">
        <Tabs.Tab value="moscow">Москва</Tabs.Tab>
        <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
