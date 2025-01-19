import { h } from "preact";
import {
  BedSingle,
  Briefcase,
  DollarSign,
  Home,
  Mail,
  User,
} from "https://esm.sh/lucide-preact@latest";
import MenuButton from "../../../buttons/MenuButton.tsx";

type FormUpdateNavigationProps = {
  onSelect: (section: string) => void;
};

export default function FormUpdateNavigation(
  { onSelect }: FormUpdateNavigationProps,
): h.JSX.Element {
  return (
    <div class="flex flex-col sm:flex-row items-center justify-start bg-white p-4 shadow-md rounded-lg mb-2">
      <MenuButton onClick={() => onSelect("personalData")}>
        <User class="mr-2" /> Dane osobowe
      </MenuButton>
      <MenuButton onClick={() => onSelect("address1")}>
        <Home class="mr-2" /> Adres zamieszkania
      </MenuButton>
      <MenuButton onClick={() => onSelect("address2")}>
        <Mail class="mr-2" /> Adres korespondencyjny
      </MenuButton>
      <MenuButton onClick={() => onSelect("jobDetails")}>
        <Briefcase class="mr-2" /> Stanowisko
      </MenuButton>
      <MenuButton onClick={() => onSelect("jobStayAddress")}>
        <BedSingle class="mr-2" /> Nocleg
      </MenuButton>
      <MenuButton onClick={() => onSelect("salary")}>
        <DollarSign class="mr-2" /> Wynagrodzenie
      </MenuButton>
    </div>
  );
}
