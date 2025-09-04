import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useTypedSelector } from "../../hooks/redux";
import { MantineProvider } from "@mantine/core";
import VacancyList from "./VacancyList";
import type { VacancyCard } from "../../types/types";

vi.mock("../../hooks/redux", () => {
  return {
    useTypedSelector: vi.fn(),
  };
});

describe("VacancyList component", () => {
  const mockVacancies: VacancyCard[] = [
    {
      id: "1",
      name: "Frontend Developer",
      salaryFrom: 100000,
      salaryTo: 150000,
      currency: "RUR",
      experience: "1-3 года",
      company: "Tech Corp",
      city: "Москва",
      workFormats: ["REMOTE", "ON_SITE"],
      directLink: "https://example.com/vacancy1",
    },
    {
      id: "2",
      name: "Backend Developer",
      salaryFrom: 120000,
      salaryTo: 180000,
      currency: "RUR",
      experience: "3-5 лет",
      company: "Soft Inc",
      city: "Санкт-Петербург",
      workFormats: ["HYBRID"],
      directLink: "https://example.com/vacancy2",
    },
  ];

  const renderWithProvider = (ui: React.ReactNode) => {
    render(<MantineProvider>{ui}</MantineProvider>);
  };

  it("should render all vacancies fron redux state", () => {
    (useTypedSelector as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockVacancies
    );

    renderWithProvider(<VacancyList />);

    mockVacancies.forEach((v) => {
      expect(screen.getByText(v.name)).toBeInTheDocument();

      expect(
        screen.getByText(
          v.salaryFrom && v.salaryTo
            ? `${v.salaryFrom} - ${v.salaryTo} ${v.currency}`
            : `${v.salaryFrom || v.salaryTo} ${v.currency}`
        )
      ).toBeInTheDocument();

      expect(screen.getByText(v.company)).toBeInTheDocument();
      expect(screen.getByText(v.city)).toBeInTheDocument();
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(mockVacancies.length);
  });
});
