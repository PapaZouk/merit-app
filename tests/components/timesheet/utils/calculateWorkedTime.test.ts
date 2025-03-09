import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { calculateWorkedTime } from "../../../../components/timesheet/utils/calculateWorkedTime.ts";

describe("calculateWorkedTime", () => {
  it("given checkIn and checkOut times, should return worked time", () => {
    expect(calculateWorkedTime("08:00", "16:00")).toEqual("8.00");
    expect(calculateWorkedTime("06:30", "16:00")).toEqual("9.30");
    expect(calculateWorkedTime("05:00", "16:00")).toEqual("11.00");
    expect(calculateWorkedTime("00:00", "23:59")).toEqual("23.59");
    expect(calculateWorkedTime("08:00", "16:30")).toEqual("8.30");
    expect(calculateWorkedTime("10:00", "16:00")).toEqual("6.00");
    expect(calculateWorkedTime("14:00", "16:00")).toEqual("2.00");
    expect(calculateWorkedTime("14:00", "16:30")).toEqual("2.30");
    expect(calculateWorkedTime("16:00", "16:00")).toEqual("0.00");
    expect(calculateWorkedTime("16:00", "16:30")).toEqual("0.30");
    expect(calculateWorkedTime("16:30", "16:00")).toEqual("0.00");
    expect(calculateWorkedTime("17:00", "16:00")).toEqual("0.00");
    expect(calculateWorkedTime("23:59", "00:00")).toEqual("0.00");
    expect(calculateWorkedTime("00:00", "00:00")).toEqual("0.00");
  });
});
