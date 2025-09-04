import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MantineProvider } from "@mantine/core";
import Card from "./Card";
import type { VacancyCard } from "../../types/types";

describe("Card component", () => {
  const baseVacancy: VacancyCard = {
    id: "1",
    name: "Frontend Developer",
    salaryFrom: 100000,
    salaryTo: 150000,
    currency: "RUR",
    experience: "1-3 года",
    company: "Tech Corp",
    city: "Москва",
    workFormats: ["REMOTE", "ON_SITE"],
    directLink: "https://example.com/vacancy",
  };

  const renderWithProvider = (ui: React.ReactNode) =>
    render(<MantineProvider>{ui}</MantineProvider>);

  it("should render vacancy info correctly", () => {
    renderWithProvider(<Card {...baseVacancy} />);

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText(/100000\s*-\s*150000 RUR/)).toBeInTheDocument();
    expect(screen.getByText("1-3 года")).toBeInTheDocument();
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
    expect(screen.getByText("Москва")).toBeInTheDocument();
  });

  it("should render work format badges", () => {
    renderWithProvider(<Card {...baseVacancy} />);

    expect(screen.getByText("Можно удаленно")).toBeInTheDocument();
    expect(screen.getByText("Офис")).toBeInTheDocument();
  });

  it("should render default values if there aren't props-info", () => {
    const vacancy: VacancyCard = {
      id: "",
      name: "",
      salaryFrom: undefined,
      salaryTo: undefined,
      currency: undefined,
      experience: "",
      company: "",
      city: "",
      workFormats: [],
      directLink: "",
    };

    renderWithProvider(<Card {...vacancy} />);

    expect(screen.getByText("Название не указано")).toBeInTheDocument();
    expect(screen.getByText("Зарплата не указана")).toBeInTheDocument();
    expect(screen.getByText("Опыт не указан")).toBeInTheDocument();
    expect(screen.getByText("Компания не указана")).toBeInTheDocument();
    expect(screen.getByText("Город не указан")).toBeInTheDocument();
    expect(screen.getByText("Формат работы не указан")).toBeInTheDocument();
  });

  it("opens direct link in new tab when clicking 'Откликнуться'", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    renderWithProvider(<Card {...baseVacancy} />);

    fireEvent.click(screen.getByText("Откликнуться"));
    expect(openSpy).toHaveBeenCalledWith(
      "https://example.com/vacancy",
      "_blank"
    );

    openSpy.mockRestore();
  });
});
