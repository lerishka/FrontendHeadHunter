import { screen, render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import { MantineProvider } from "@mantine/core";
import SkillsFilter from "./SkillsFilter";
import { setSkills } from "../../../store/vacanciesSlice";

vi.mock("../../../hooks/redux", () => {
  return {
    useTypedDispatch: vi.fn(),
    useTypedSelector: vi.fn(),
  };
});

describe("SkillsFilter component", () => {
  const renderWithProvider = (ui: React.ReactNode) => {
    render(<MantineProvider>{ui}</MantineProvider>);
  };

  const dispatchMock = vi.fn();
  (useTypedDispatch as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
    dispatchMock
  );

  (useTypedSelector as unknown as ReturnType<typeof vi.fn>).mockImplementation(
    (selectorFn: any) =>
      selectorFn({
        vacancies: {
          filters: {
            skills: ["React"],
          },
        },
      })
  );

  it("Shouild render filter header", () => {
    renderWithProvider(<SkillsFilter />);

    expect(screen.getByText("Ключевые навыки")).toBeInTheDocument();
  });

  it("Should add skill", async () => {
    renderWithProvider(<SkillsFilter />);
    expect(await screen.findByTestId("skill-React")).toBeInTheDocument();

    const inpit = screen.getByPlaceholderText("Навык");
    fireEvent.change(inpit, { target: { value: "TypeScript" } });

    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    expect(dispatchMock).toHaveBeenCalledWith(
      setSkills(["React", "TypeScript"])
    );
  });
});
