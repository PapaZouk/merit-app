import {describe, it} from "jsr:@std/testing/bdd";
import {expect} from "jsr:@std/expect";
import {isWeekend} from "../../../../components/timesheet/utils/isWeekend.ts";

describe("isWeekend", () => {
   it("should return true for Saturday", () => {
         const result = isWeekend(2021, 1, 2);
         expect(result).toBe(true);
    });

    it("should return true for Sunday", () => {
            const result = isWeekend(2021, 1, 3);
            expect(result).toBe(true);
     });

    it("should return false for Monday", () => {
            const result = isWeekend(2021, 1, 4);
            expect(result).toBe(false);
     });

    it("should return false for Tuesday", () => {
            const result = isWeekend(2021, 1, 5);
            expect(result).toBe(false);
     });

    it("should return false for Wednesday", () => {
            const result = isWeekend(2021, 1, 6);
            expect(result).toBe(false);
     });

    it("should return false for Thursday", () => {
            const result = isWeekend(2021, 1, 7);
            expect(result).toBe(false);
     });

    it("should return false for Friday", () => {
            const result = isWeekend(2021, 1, 8);
            expect(result).toBe(false);
     });
});