import { useState } from "preact/hooks";
import {
  AppWindowMac,
  BookText,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ClipboardPlus,
  Clock,
  Coins,
  Users,
  X,
} from "https://esm.sh/lucide-preact@latest";
import SubMenuLink from "../components/sidebar/subMenuLink.tsx";
import SectionElement from "../components/sidebar/sectionElement.tsx";
import Section from "../components/sidebar/section.tsx";
import { useLogin } from "./context/LoginProvider.tsx";
import {
  UserRole,
  UserRoleEnum,
} from "../components/utils/auth/types/userRoles.ts";

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar(
  { isSidebarOpen, toggleSidebar }: SidebarProps,
) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const { userRoles } = useLogin();

  const toggleSubmenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <nav
      class={`fixed inset-y-0 left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }
                md:relative md:translate-x-0 w-full md:w-2/3 max-w-[300px] md:max-w-[300px] bg-gray-800 p-4 transition-transform
                duration-500 ease-in-out shadow-lg`}
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="flex items-center font-bold text-white">
          <AppWindowMac size={18} class="mr-2" /> PANEL GŁÓWNY
        </h2>
        <button class="md:hidden text-white" onClick={toggleSidebar}>
          <X size={24} />
        </button>
      </div>
      <div class="pl-4">
        {([
          UserRoleEnum.ADMIN,
          UserRoleEnum.HR_MANAGER,
          UserRoleEnum.HR_EMPLOYEE,
        ].some((role) => userRoles.includes(role as UserRole))) && (
          <Section
            title={
              <>
                <ChartNoAxesCombined size={20} class="mr-2" />HR
              </>
            }
          >
            <>
              <SectionElement
                href={"#"}
                title={"manager"}
                nameAndIcon={
                  <>
                    <BriefcaseBusiness size={14} class="mr-2" /> Manager
                  </>
                }
                toggleSubmenu={toggleSubmenu}
                expandedMenu={expandedMenu}
              >
                <>
                  <SubMenuLink href={"/manager/courses"}>Szkolenia</SubMenuLink>
                </>
              </SectionElement>

              <SectionElement
                href={"#"}
                title={"employees"}
                nameAndIcon={
                  <>
                    <Users size={14} class="mr-2" /> Pracownicy
                  </>
                }
                toggleSubmenu={toggleSubmenu}
                expandedMenu={expandedMenu}
              >
                <>
                  <SubMenuLink href="/hr/employees/overview">Przegląd</SubMenuLink>
                  {[UserRoleEnum.HR_MANAGER].some((role) =>
                    userRoles.includes(role as UserRole)
                  ) && (
                    <>
                      <SubMenuLink href="/hr/employees/add">Dodaj</SubMenuLink>
                      <SubMenuLink href={"/hr/employees/delete"}>Usuń</SubMenuLink>
                    </>
                  )}
                  <SubMenuLink href="/hr/employees/update">Aktualizuj</SubMenuLink>
                  <SubMenuLink href={"/hr/employees/leave"}>Urlopy</SubMenuLink>
                  <SubMenuLink href={"/hr/employees/contracts"}>Umowy</SubMenuLink>
                </>
              </SectionElement>

              <SectionElement
                href={"#"}
                title={"timesheet"}
                nameAndIcon={
                  <>
                    <Clock size={14} class="mr-2" /> Godziny
                  </>
                }
                toggleSubmenu={toggleSubmenu}
                expandedMenu={expandedMenu}
              >
                <>
                  <SubMenuLink href="/hr/timesheet/overview">
                    Przegląd
                  </SubMenuLink>
                  <SubMenuLink href="/hr/timesheet/add">Dodaj</SubMenuLink>
                  <SubMenuLink href="/hr/timesheet/update">
                    Aktualizuj
                  </SubMenuLink>
                </>
              </SectionElement>
            </>
          </Section>
        )}

        {([UserRoleEnum.ADMIN, UserRoleEnum.FINANCE_MANAGER].some((role) =>
          userRoles.includes(role as UserRole)
        )) && (
          <Section
            title={
              <>
                <ChartNoAxesCombined size={20} class="mr-2" />FINANSE
              </>
            }
          >
            <>
              <SectionElement
                href={"#"}
                title={"invoices"}
                nameAndIcon={
                  <>
                    <BookText size={14} class="mr-2" /> Faktury
                  </>
                }
                toggleSubmenu={toggleSubmenu}
                expandedMenu={expandedMenu}
              >
                <>
                  <SubMenuLink href="/finance/invoices">Przegląd</SubMenuLink>
                </>
              </SectionElement>

              <SectionElement
                href={"#"}
                title={"payments"}
                nameAndIcon={
                  <>
                    <Coins size={14} class="mr-2" /> Rozliczenia
                  </>
                }
                toggleSubmenu={toggleSubmenu}
                expandedMenu={expandedMenu}
              >
                <>
                  <SubMenuLink href="/finance/payments">Przegląd</SubMenuLink>
                </>
              </SectionElement>

              <SectionElement
                href={"#"}
                title={"reports"}
                nameAndIcon={
                  <>
                    <ClipboardPlus size={14} class="mr-2" /> Raporty
                  </>
                }
                toggleSubmenu={toggleSubmenu}
                expandedMenu={expandedMenu}
              >
                <>
                  <SubMenuLink href="/finance/reports">Przegląd</SubMenuLink>
                </>
              </SectionElement>
            </>
          </Section>
        )}
      </div>
    </nav>
  );
}
