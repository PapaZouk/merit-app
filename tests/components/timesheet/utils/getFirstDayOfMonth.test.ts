import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { getFirstDayOfMonth } from "../../../../components/timesheet/utils/getFirstDayOfTheMonth.ts";

describe("getFirstDayOfMonth", () => {
  it("should return correct first day of the month", () => {
    // 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 7 - Sunday
    expect(getFirstDayOfMonth(2021, 1)).toBe(5);
    expect(getFirstDayOfMonth(2021, 2)).toBe(1);
    expect(getFirstDayOfMonth(2021, 3)).toBe(1);
    expect(getFirstDayOfMonth(2021, 4)).toBe(4);
    expect(getFirstDayOfMonth(2021, 5)).toBe(6);
    expect(getFirstDayOfMonth(2021, 6)).toBe(2);
    expect(getFirstDayOfMonth(2021, 7)).toBe(4);
    expect(getFirstDayOfMonth(2021, 8)).toBe(7);
    expect(getFirstDayOfMonth(2021, 9)).toBe(3);
    expect(getFirstDayOfMonth(2021, 10)).toBe(5);
    expect(getFirstDayOfMonth(2021, 11)).toBe(1);
    expect(getFirstDayOfMonth(2021, 12)).toBe(3);
  });
});
