// deno-lint-ignore-file
import { useState } from "preact/hooks";
import {
  LuAppWindowMac,
  LuBookText,
  LuBriefcaseBusiness,
  LuChartNoAxesCombined,
  LuClipboardPlus,
  LuClock,
  LuCoins,
  LuUsers,
  LuX,
} from "@preact-icons/lu";
import SubMenuLink from "../components/sidebar/subMenuLink.tsx";
import SectionElement from "../components/sidebar/sectionElement.tsx";
import Section from "../components/sidebar/section.tsx";
import {
  UserRole,
  UserRoleEnum,
} from "../components/utils/auth/types/userRoles.ts";
import {useLogin} from "../components/context/LoginProvider.tsx";

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
          <a href={"/"} class="flex items-center">
            <LuAppWindowMac size={18} class="mr-2" /> PANEL GŁÓWNY
          </a>
        </h2>
        <button class="md:hidden text-white" onClick={toggleSidebar}>
          <LuX size={24} />
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
                <LuChartNoAxesCombined size={20} class="mr-2" />HR
              </>
            }
          >
            <>
              <SectionElement
                href={"#"}
                title={"manager"}
                nameAndIcon={
                  <>
                    <LuBriefcaseBusiness size={14} class="mr-2" /> Manager
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
                    <LuUsers size={14} class="mr-2" /> Pracownicy
                  </>
                }
                toggleSubmenu={toggleSubmenu}
                expandedMenu={expandedMenu}
              >
                <>
                  <SubMenuLink href="/hr/employees/overview">Przegląd</SubMenuLink>
                  {[UserRoleEnum.ADMIN, UserRoleEnum.HR_MANAGER].some((role) =>
                    userRoles.includes(role as UserRole)
                  ) && (
                    <>
                      <SubMenuLink href="/hr/employees/add">Dodaj</SubMenuLink>
                    </>
                  )}
                </>
              </SectionElement>

              <SectionElement
                href={"#"}
                title={"timesheet"}
                nameAndIcon={
                  <>
                    <LuClock size={14} class="mr-2" /> Godziny
                  </>
                }
                toggleSubmenu={toggleSubmenu}
                expandedMenu={expandedMenu}
              >
                <>
                  <SubMenuLink href="/hr/timesheet/overview">
                    Przegląd
                  </SubMenuLink>
                  {[UserRoleEnum.ADMIN, UserRoleEnum.HR_MANAGER].some((role) =>
                  userRoles.includes(role as UserRole)
                  ) && (
                      <SubMenuLink href={"/hr/timesheet/annual-leaves"}>
                        Urlopy
                      </SubMenuLink>
                  )}
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
                <LuChartNoAxesCombined size={20} class="mr-2" />FINANSE
              </>
            }
          >
            <>
              <SectionElement
                href={"#"}
                title={"invoices"}
                nameAndIcon={
                  <>
                    <LuBookText size={14} class="mr-2" /> Faktury
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
                    <LuCoins size={14} class="mr-2" /> Rozliczenia
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
                    <LuClipboardPlus size={14} class="mr-2" /> Raporty
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
