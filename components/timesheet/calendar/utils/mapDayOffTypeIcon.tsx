import {
  LuBaby,
  LuBriefcaseBusiness,
  LuConciergeBell,
  LuHandHeart,
  LuStethoscope,
  LuTreePalm,
  LuUmbrella,
  LuUsersRound,
} from "@preact-icons/lu";

export const mapDayOffTypeIcon = (dayOffType: string) => {
  const iconStyle = "ml-1 w-4 h-4";
  switch (dayOffType) {
    case "maternityLeave":
      return <LuBaby class={iconStyle} />;
    case "childcareLeave":
      return <LuUsersRound class={iconStyle} />;
    case "occasionalLeave":
      return <LuUmbrella class={iconStyle} />;
    case "parentalLeave":
      return <LuHandHeart class={iconStyle} />;
    case "onDemand":
      return <LuConciergeBell class={iconStyle} />;
    case "sickLeave":
      return <LuStethoscope class="ml-1 w-4 h-4" />;
    case "paid":
    case "unpaid":
      return <LuTreePalm class="ml-1 w-4 h-4" />;
    default:
      return <LuBriefcaseBusiness class="ml-1 w-4 h-4" />;
  }
};
