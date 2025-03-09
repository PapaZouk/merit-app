import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { mapTotalBalance } from "../../../../components/timesheet/mappers/mapTotalBalance.tsx";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";

describe("mapTotalBalance", () => {
  beforeEach(() => beforeEachSetup());

  it("should return a positive balance", () => {
    const minutes = 120;
    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("+2 godziny");
  });

  it("should return a negative balance", () => {
    const minutes = -120;
    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("-2 godziny");
  });

  it("should return a positive minutes when hours are 0", () => {
    const minutes = 30;

    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("+30 minut");
  });

  it("should return singular label for positive minutes", () => {
    const minutes = 1;

    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("+1 minuta");
  });

  it("should return singular label for negative minutes", () => {
    const minutes = -1;

    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("-1 minuta");
  });

  it("should return negative minutes", () => {
    const minutes = -30;

    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("-30 minut");
  });

  it("should return singular label for positive hours", () => {
    const minutes = 60;

    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("+1 godzina");
  });

  it("should return singular label for negative hours", () => {
    const minutes = -60;

    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("-1 godzina");
  });

  it("should return positive hours and minutes", () => {
    const minutes = 150;

    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("+2 godziny 30 minut");
  });

  it("should return negative hours and minutes", () => {
    const minutes = -150;

    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("-2 godziny 30 minut");
  });

  it("should return positive single hour with a minutes", () => {
    const minutes = 75;

    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("+1 godzina 15 minut");
  });

  it("should return negative single hour with a minutes", () => {
    const minutes = -75;

    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("-1 godzina 15 minut");
  });

  it("when given a positive minutes number and hasFullLabel is false, should return short labels", () => {
    const minutes = 150;
    const hasFullLabel = false;

    const result = mapTotalBalance(minutes, hasFullLabel);
    const { container } = render(result);

    expect(container.textContent).toContain("+2 g 30 m");
  });

  it("when given a negative minutes and hasFullLabel is false, should return short labels", () => {
    const minutes = -150;
    const hasFullLabel = false;

    const result = mapTotalBalance(minutes, hasFullLabel);
    const { container } = render(result);

    expect(container.textContent).toContain("-2 g 30 m");
  });

  it("when given a positive single hour with minutes and hasFullLabel is false, should return short labels", () => {
    const minutes = 75;
    const hasFullLabel = false;

    const result = mapTotalBalance(minutes, hasFullLabel);
    const { container } = render(result);

    expect(container.textContent).toContain("+1 g 15 m");
  });

  it("when given a negative single hour with minutes and hasFullLabel is false, should return short labels", () => {
    const minutes = -75;
    const hasFullLabel = false;

    const result = mapTotalBalance(minutes, hasFullLabel);
    const { container } = render(result);

    expect(container.textContent).toContain("-1 g 15 m");
  });

  it("should return a positive balance with only minutes when hasFullLabel is false", () => {
    const minutes = 30;
    const hasFullLabel = false;

    const result = mapTotalBalance(minutes, hasFullLabel);
    const { container } = render(result);

    expect(container.textContent).toContain("+30 m");
  });

  it("should return a negative balance with only minutes when hasFullLabel is false", () => {
    const minutes = -30;
    const hasFullLabel = false;

    const result = mapTotalBalance(minutes, hasFullLabel);
    const { container } = render(result);

    expect(container.textContent).toContain("-30 m");
  });

  it("should return 0 minutes when given 0", () => {
    const minutes = 0;

    const result = mapTotalBalance(minutes);
    const { container } = render(result);

    expect(container.textContent).toContain("0 minut");
  });
});
