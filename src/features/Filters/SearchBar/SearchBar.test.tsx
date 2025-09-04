import { screen, render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MantineProvider } from "@mantine/core";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import SearchBar from "./SearchBar";
import { setSearchText } from "../../../store/vacanciesSlice";

vi.mock("../../../hooks/redux", () => ({
  useTypedDispatch: vi.fn(),
  useTypedSelector: vi.fn(),
}));

describe("SearchBar component", () => {
  const dispatchMock = vi.fn();
  const renderWithProvider = (ui: React.ReactNode) => {
    render(<MantineProvider>{ui}</MantineProvider>);
  };
  (useTypedDispatch as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
    dispatchMock
  );
  (useTypedSelector as unknown as ReturnType<typeof vi.fn>).mockImplementation(
    (selectorFn: any) =>
      selectorFn({
        vacancies: {
          filters: {
            searchText: "",
          },
        },
      })
  );
  it("should render input and button and dispatches action on click", () => {
    renderWithProvider(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Должность или название компании"
    );
    expect(input).toBeInTheDocument();
    const button = screen.getByText("Найти");
    expect(button).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Frontend" } });
    expect((input as HTMLInputElement).value).toBe("Frontend");

    fireEvent.click(button);

    expect(dispatchMock).toHaveBeenCalledWith(setSearchText("Frontend"));

    expect((input as HTMLInputElement).value).toBe("");
  });
});
