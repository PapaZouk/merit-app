import {describe, it} from "jsr:@std/testing/bdd";
import {expect} from "jsr:@std/expect";
import {mapTimesheetMonth} from "../../../../components/timesheet/mappers/mapTimesheetMonth.ts";

describe("mapTimesheetMonth", () => {
    it("should map number value to correct month", () => {
        expect(mapTimesheetMonth(1)).toBe("Styczeń");
        expect(mapTimesheetMonth(2)).toBe("Luty");
        expect(mapTimesheetMonth(3)).toBe("Marzec");
        expect(mapTimesheetMonth(4)).toBe("Kwiecień");
        expect(mapTimesheetMonth(5)).toBe("Maj");
        expect(mapTimesheetMonth(6)).toBe("Czerwiec");
        expect(mapTimesheetMonth(7)).toBe("Lipiec");
        expect(mapTimesheetMonth(8)).toBe("Sierpień");
        expect(mapTimesheetMonth(9)).toBe("Wrzesień");
        expect(mapTimesheetMonth(10)).toBe("Październik");
        expect(mapTimesheetMonth(11)).toBe("Listopad");
        expect(mapTimesheetMonth(12)).toBe("Grudzień");
        expect(mapTimesheetMonth(13)).toBe("Brak danych");
    });
});