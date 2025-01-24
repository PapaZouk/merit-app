import {
  Baby,
  BriefcaseBusiness,
  ConciergeBell,
  HandHeart,
  Stethoscope,
  TreePalm,
  Umbrella,
  UsersRound,
} from "https://esm.sh/lucide-preact@latest";

export const mapDayOffTypeIcon = (dayOffType: string) => {
  const iconStyle = "ml-1 w-4 h-4";
  switch (dayOffType) {
    case "maternityLeave":
      return <Baby class={iconStyle} />;
    case "childcareLeave":
      return <UsersRound class={iconStyle} />;
    case "occasionalLeave":
      return <Umbrella class={iconStyle} />;
    case "parentalLeave":
      return <HandHeart class={iconStyle} />;
    case "onDemand":
      return <ConciergeBell class={iconStyle} />;
    case "sickLeave":
      return <Stethoscope class="ml-1 w-4 h-4" />;
    case "paid":
    case "unpaid":
      return <TreePalm class="ml-1 w-4 h-4" />;
    default:
      return <BriefcaseBusiness class="ml-1 w-4 h-4" />;
  }
};
