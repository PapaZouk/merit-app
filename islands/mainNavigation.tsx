import { Bell, CircleUserRound, Mail } from "https://esm.sh/lucide-preact@latest";
import { useEffect, useState, useRef } from 'preact/hooks';

type MainNavigationProps = {
    toggleSidebar: () => void;
}

export default function MainNavigation({ toggleSidebar }: MainNavigationProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const appName = Deno.env.get("APP_NAME");

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
            setIsProfileOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <nav class="w-full bg-white text-gray-800 p-4 flex justify-between items-center shadow-md">
            <button class="md:hidden" onClick={toggleSidebar}>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            <div class="flex items-center">
                <a href="/">
                    <img src="/images/logo_256x256.png" alt="Logo" class="w-8 h-8 mx-auto md:mx-0 md:ml-4"/>
                </a>
                <span class="ml-2 text-xl font-semibold text-gray-800" style={{fontFamily: 'Arial, sans-serif' }}>{appName}</span>
            </div>
            <div class="relative flex items-center ml-auto">
                <Bell size={24} class="mr-4 text-gray-600 hover:text-gray-900" />
                <Mail size={24} class="mr-4 text-gray-600 hover:text-gray-900" />
                <button onClick={toggleProfileMenu} class="flex items-center">
                    <CircleUserRound size={32} class="text-gray-600 hover:text-gray-900" />
                </button>
                {isProfileOpen && (
                    <div ref={profileMenuRef} class="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg">
                        <a href="/profile" class="block px-4 py-2 hover:bg-gray-100">Profil</a>
                        <a href="/settings" class="block px-4 py-2 hover:bg-gray-100">Ustawienia</a>
                        <a href="/logout" class="block px-4 py-2 hover:bg-gray-100">Wyloguj</a>
                    </div>
                )}
            </div>
        </nav>
    )
}