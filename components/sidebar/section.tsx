import { h } from 'preact';

type SectionProps = {
    children: h.JSX.Element|string;
    title: h.JSX.Element|string;
}

export default function Section({ children, title }: SectionProps) {
  return (
    <div class="bg-gray-700 p-3 rounded-lg mb-4">
      <h2 class="flex items-center text-white font-bold mb-2 bg-gray-600 p-2 rounded border border-gray-500">
        {title}
      </h2>
        {children}
    </div>
  );
}
