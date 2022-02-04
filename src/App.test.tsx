import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App tests", () => {
  it('Should render page title', () => {
    render(<App />);
    const ceElement = screen.getByTestId('app-title');
    expect(ceElement).not.toBe(null);
  });

  it('Should render Base Currency Dropdowns', () => {
    render(<App />);
    const ceElement = screen.getByTestId('base-currency-dropdowns');
    expect(ceElement).not.toBe(null);
  });
});
