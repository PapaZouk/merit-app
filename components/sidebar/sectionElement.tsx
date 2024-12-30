import { h } from "preact";

type SectionElementProps = {
    children: h.JSX.Element|string;
    href: string;
    title: string;
    nameAndIcon: h.JSX.Element|string;
    toggleSubmenu: (arg0: string) => void;
    expandedMenu: string|null;
}

export default function SectionElement({ children, href, title, nameAndIcon, toggleSubmenu, expandedMenu }: SectionElementProps) {
  return (
      <>
          <a
              href={href}
              class="flex items-center block mb-2 text-gray-300 hover:text-white"
              onClick={() => toggleSubmenu(title)}
          >
              {nameAndIcon}
          </a>
          <div
              class={`overflow-hidden transition-all duration-300 ease-in-out transform ${
                  expandedMenu === title
                      ? "max-h-full opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-4"
              }`}
          >
              {children}
          </div>
          </>
          );
          }
