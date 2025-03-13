import { h } from "preact";
import {
  LuBedSingle,
  LuBriefcase,
  LuDollarSign,
  LuHouse,
  LuMail,
  LuUser,
} from "@preact-icons/lu";
import MenuButton from "../../../common/buttons/MenuButton.tsx";

type FormUpdateNavigationProps = {
  onSelect: (section: string) => void;
};

export default function FormUpdateNavigation(
  { onSelect }: FormUpdateNavigationProps,
): h.JSX.Element {
  return (
    <div class="flex flex-col sm:flex-row items-center justify-start bg-white p-4 shadow-md rounded-lg mb-2">
      <MenuButton onClick={() => onSelect("personalData")}>
        <LuUser class="mr-2" /> Dane osobowe
      </MenuButton>
      <MenuButton onClick={() => onSelect("address1")}>
        <LuHouse class="mr-2" /> Adres zamieszkania
      </MenuButton>
      <MenuButton onClick={() => onSelect("address2")}>
        <LuMail class="mr-2" /> Adres korespondencyjny
      </MenuButton>
      <MenuButton onClick={() => onSelect("jobDetails")}>
        <LuBriefcase class="mr-2" /> Stanowisko
      </MenuButton>
      <MenuButton onClick={() => onSelect("jobStayAddress")}>
        <LuBedSingle class="mr-2" /> Nocleg
      </MenuButton>
      <MenuButton onClick={() => onSelect("salary")}>
        <LuDollarSign class="mr-2" /> Wynagrodzenie
      </MenuButton>
    </div>
  );
}
