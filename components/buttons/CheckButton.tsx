import { Binoculars } from "https://esm.sh/lucide-preact@latest";

type CheckButtonProps = {
  href: string;
};

export default function CheckButton({ href }: CheckButtonProps) {
  return (
    <button
      onClick={() => globalThis.location.href = `${href}`}
      class="bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded
      hover:from-green-400 hover:to-green-600 transition-colors duration-300"
    >
      <span class="hidden lg:inline">Zobacz</span>
      <Binoculars class="inline lg:hidden" />
    </button>
  );
}
