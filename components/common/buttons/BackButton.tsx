import { ArrowLeft as DefaultBackButtonIcon } from "https://esm.sh/lucide-preact@latest";

type BackButtonProps = {
  href: string;
  BackButtonIcon?: typeof DefaultBackButtonIcon;
};

export default function BackButton(
  { href, BackButtonIcon = DefaultBackButtonIcon }: BackButtonProps,
) {
  return (
    <a
      href={href}
      class="flex items-center bg-gradient-to-r from-gray-500
      to-gray-600 text-white px-3 py-2 rounded hover:from-gray-500
      hover:to-gray-700 transition-colors duration-300"
    >
      <BackButtonIcon size={16} class="mr-2" /> Powrót
    </a>
  );
}
