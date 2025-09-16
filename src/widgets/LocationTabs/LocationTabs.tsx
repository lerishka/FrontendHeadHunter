import { Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const LocationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState<"moscow" | "petersburg">("moscow");

  useEffect(() => {
    if (location.pathname.includes("petersburg")) setTab("petersburg");
    else setTab("moscow");
  }, [location.pathname]);

  return (
    <Tabs
      value={tab}
      onChange={(value: string | null) => {
        if (!value) return;
        setTab(value as "moscow" | "petersburg");
        if (value === "moscow") navigate("/vacancies/moscow");
        else if (value === "petersburg") navigate("/vacancies/petersburg");
      }}
    >
      <Tabs.List color="#4263EB">
        <Tabs.Tab value="moscow">Москва</Tabs.Tab>
        <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
