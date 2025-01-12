import { h } from "preact";
import {
  Briefcase,
  DollarSign,
  Home,
  Mail,
  User,
} from "https://esm.sh/lucide-preact@latest";

type FormUpdateNavigationProps = {
  onSelect: (section: string) => void;
};

export default function FormUpdateNavigation(
  { onSelect }: FormUpdateNavigationProps,
): h.JSX.Element {
  return (
    <div class="flex items-center justify-start bg-white p-4 shadow-md rounded-lg mb-2">
      <button
        onClick={() => onSelect("personalData")}
        class="flex items-center text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded transition-colors duration-200 mr-2"
      >
        <User class="mr-2" /> Dane osobowe
      </button>
      <button
        onClick={() => onSelect("address1")}
        class="flex items-center text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded transition-colors duration-200 mr-2"
      >
        <Home class="mr-2" /> Adres zamieszkania
      </button>
      <button
        onClick={() => onSelect("address2")}
        class="flex items-center text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded transition-colors duration-200 mr-2"
      >
        <Mail class="mr-2" /> Adres korespondencyjny
      </button>
      <button
        onClick={() => onSelect("jobDetails")}
        class="flex items-center text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded transition-colors duration-200 mr-2"
      >
        <Briefcase class="mr-2" /> Zatrudnienie
      </button>
      <button
        onClick={() => onSelect("salary")}
        class="flex items-center text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded transition-colors duration-200"
      >
        <DollarSign class="mr-2" /> Wynagrodzenie
      </button>
    </div>
  );
}
