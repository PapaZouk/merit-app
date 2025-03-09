import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { calculateDayBalance } from "../../../../components/timesheet/utils/calculateDayBalance.ts";

describe("calculateDayBalance", () => {
  it("should calculate day work hours balance correctly", () => {
    expect(calculateDayBalance("08:00", "16:00")).toBe(0);
    expect(calculateDayBalance("09:00", "17:00")).toBe(0);
    expect(calculateDayBalance("09:00", "16:00")).toBe(-60);
    expect(calculateDayBalance("09:00", "17:30")).toBe(30);
    expect(calculateDayBalance("07:00", "16:00")).toBe(60);
    expect(calculateDayBalance("08:00", "18:00")).toBe(120);
    expect(calculateDayBalance("10:00", "16:00")).toBe(-120);
    expect(calculateDayBalance("08:10", "16:00")).toBe(-10);
    expect(calculateDayBalance("08:00", "16:10")).toBe(10);
    expect(calculateDayBalance("08:02", "16:00")).toBe(-2);
    expect(calculateDayBalance("08:00", "16:02")).toBe(2);
    expect(calculateDayBalance("00:00", "00:00")).toBe(0);
    expect(calculateDayBalance("00:00", "23:59")).toBe(959); // 8 working hours + overtime
    expect(calculateDayBalance("00:00", "00:01")).toBe(-479); // 8 working hours - 1 minute
    expect(calculateDayBalance("17:00", "17:01")).toBe(-479); // 8 working hours - 1 minute
    expect(calculateDayBalance("17:00", "16:00")).toBe(-480); // no working hours completed
    expect(calculateDayBalance("20:00", "16:00")).toBe(-480); // no working hours completed
  });
});
