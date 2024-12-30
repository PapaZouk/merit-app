import { h } from 'preact';

type SubMenuLinkProps = {
    href: string;
    children: h.JSX.Element|string;
}

export default function SubMenuLink({ href, children }: SubMenuLinkProps) {
    return (
        <a
            href={href}
            class="flex items-center block pl-6 mb-2 text-gray-300 hover:text-white"
        >
            {children}
        </a>
)
}