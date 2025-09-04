import { screen, render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import { MantineProvider } from "@mantine/core";
import CityFilter from "./CityFilter";

vi.mock("../../../hooks/redux", () => ({
  useTypedDispatch: vi.fn(),
  useTypedSelector: vi.fn(),
}));

describe("CityFilter component", () => {
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
        vacancies: { filters: { cityId: "all" } },
      })
  );

  it("should render select with initial value and dispatches on change", async () => {
    renderWithProvider(<CityFilter />);
    const input = screen.getByRole("textbox") as HTMLSelectElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Все города");

    fireEvent.mouseDown(input);

    const option = await screen.findByText("Москва");
    fireEvent.click(option);

    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "vacancies/setCityId",
        payload: "1",
      })
    );
  });
});
