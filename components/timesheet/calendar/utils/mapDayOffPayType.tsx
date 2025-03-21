import { LuCircleDollarSign, LuCircleX } from "@preact-icons/lu";

export const mapDayOffPayType = (dayOffType: string) => {
  switch (dayOffType) {
    case "paid":
    case "onDemand":
    case "maternityLeave":
    case "parentalLeave":
    case "occasionalLeave":
      return (
        <div class="flex items-center justify-center mt-1">
          <LuCircleDollarSign class="ml-1 w-4 h-4" />
        </div>
      );
    case "unpaid":
    case "childcareLeave":
      return (
        <div class="flex items center justify-center mt-1">
          <LuCircleX class="ml-1 w-4 h-4 text-black" />
        </div>
      );
  }
};
