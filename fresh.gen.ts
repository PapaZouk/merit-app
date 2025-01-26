// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $hr_employee_id_ from "./routes/hr/employee/[id].tsx";
import * as $hr_employee_edit_address1_id_ from "./routes/hr/employee/edit/address1/[id].tsx";
import * as $hr_employee_edit_address2_id_ from "./routes/hr/employee/edit/address2/[id].tsx";
import * as $hr_employee_edit_jobdetails_id_ from "./routes/hr/employee/edit/jobdetails/[id].tsx";
import * as $hr_employee_edit_jobstayaddress_id_ from "./routes/hr/employee/edit/jobstayaddress/[id].tsx";
import * as $hr_employee_edit_personal_id_ from "./routes/hr/employee/edit/personal/[id].tsx";
import * as $hr_employee_edit_salary_id_ from "./routes/hr/employee/edit/salary/[id].tsx";
import * as $hr_employees_add from "./routes/hr/employees/add.tsx";
import * as $hr_employees_overview from "./routes/hr/employees/overview.tsx";
import * as $hr_timesheet_calendar_id_ from "./routes/hr/timesheet/calendar/[id].tsx";
import * as $hr_timesheet_overview from "./routes/hr/timesheet/overview.tsx";
import * as $index from "./routes/index.tsx";
import * as $user_notifications_id_ from "./routes/user/notifications/[id].tsx";
import * as $auth_login from "./islands/auth/login.tsx";
import * as $employees_EmployeesManager from "./islands/employees/EmployeesManager.tsx";
import * as $employees_EmployeesOverview from "./islands/employees/EmployeesOverview.tsx";
import * as $employees_add_CreateNewEmployee from "./islands/employees/add/CreateNewEmployee.tsx";
import * as $employees_edit_EmployeeUpdateAddress1 from "./islands/employees/edit/EmployeeUpdateAddress1.tsx";
import * as $employees_edit_EmployeeUpdateAddress2 from "./islands/employees/edit/EmployeeUpdateAddress2.tsx";
import * as $employees_edit_EmployeeUpdateJobDetails from "./islands/employees/edit/EmployeeUpdateJobDetails.tsx";
import * as $employees_edit_EmployeeUpdateJobStayAddress from "./islands/employees/edit/EmployeeUpdateJobStayAddress.tsx";
import * as $employees_edit_EmployeeUpdatePersonalData from "./islands/employees/edit/EmployeeUpdatePersonalData.tsx";
import * as $employees_edit_EmployeeUpdateSalary from "./islands/employees/edit/EmployeeUpdateSalary.tsx";
import * as $employees_employeeDetails from "./islands/employees/employeeDetails.tsx";
import * as $layouts_PageContent from "./islands/layouts/PageContent.tsx";
import * as $layouts_RootLayout from "./islands/layouts/RootLayout.tsx";
import * as $layouts_WidgetsLayout from "./islands/layouts/WidgetsLayout.tsx";
import * as $mainNavigation from "./islands/mainNavigation.tsx";
import * as $notifications_event_EventNotifications from "./islands/notifications/event/EventNotifications.tsx";
import * as $sidebar from "./islands/sidebar.tsx";
import * as $tables_employeesTable from "./islands/tables/employeesTable.tsx";
import * as $timesheet_TimesheetCalendar from "./islands/timesheet/TimesheetCalendar.tsx";
import * as $timesheet_TimesheetOverview from "./islands/timesheet/TimesheetOverview.tsx";
import * as $widgets_AdminWidgets from "./islands/widgets/AdminWidgets.tsx";
import * as $widgets_FinWidgets from "./islands/widgets/FinWidgets.tsx";
import * as $widgets_HrWidgets from "./islands/widgets/HrWidgets.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/hr/employee/[id].tsx": $hr_employee_id_,
    "./routes/hr/employee/edit/address1/[id].tsx":
      $hr_employee_edit_address1_id_,
    "./routes/hr/employee/edit/address2/[id].tsx":
      $hr_employee_edit_address2_id_,
    "./routes/hr/employee/edit/jobdetails/[id].tsx":
      $hr_employee_edit_jobdetails_id_,
    "./routes/hr/employee/edit/jobstayaddress/[id].tsx":
      $hr_employee_edit_jobstayaddress_id_,
    "./routes/hr/employee/edit/personal/[id].tsx":
      $hr_employee_edit_personal_id_,
    "./routes/hr/employee/edit/salary/[id].tsx": $hr_employee_edit_salary_id_,
    "./routes/hr/employees/add.tsx": $hr_employees_add,
    "./routes/hr/employees/overview.tsx": $hr_employees_overview,
    "./routes/hr/timesheet/calendar/[id].tsx": $hr_timesheet_calendar_id_,
    "./routes/hr/timesheet/overview.tsx": $hr_timesheet_overview,
    "./routes/index.tsx": $index,
    "./routes/user/notifications/[id].tsx": $user_notifications_id_,
  },
  islands: {
    "./islands/auth/login.tsx": $auth_login,
    "./islands/employees/EmployeesManager.tsx": $employees_EmployeesManager,
    "./islands/employees/EmployeesOverview.tsx": $employees_EmployeesOverview,
    "./islands/employees/add/CreateNewEmployee.tsx":
      $employees_add_CreateNewEmployee,
    "./islands/employees/edit/EmployeeUpdateAddress1.tsx":
      $employees_edit_EmployeeUpdateAddress1,
    "./islands/employees/edit/EmployeeUpdateAddress2.tsx":
      $employees_edit_EmployeeUpdateAddress2,
    "./islands/employees/edit/EmployeeUpdateJobDetails.tsx":
      $employees_edit_EmployeeUpdateJobDetails,
    "./islands/employees/edit/EmployeeUpdateJobStayAddress.tsx":
      $employees_edit_EmployeeUpdateJobStayAddress,
    "./islands/employees/edit/EmployeeUpdatePersonalData.tsx":
      $employees_edit_EmployeeUpdatePersonalData,
    "./islands/employees/edit/EmployeeUpdateSalary.tsx":
      $employees_edit_EmployeeUpdateSalary,
    "./islands/employees/employeeDetails.tsx": $employees_employeeDetails,
    "./islands/layouts/PageContent.tsx": $layouts_PageContent,
    "./islands/layouts/RootLayout.tsx": $layouts_RootLayout,
    "./islands/layouts/WidgetsLayout.tsx": $layouts_WidgetsLayout,
    "./islands/mainNavigation.tsx": $mainNavigation,
    "./islands/notifications/event/EventNotifications.tsx":
      $notifications_event_EventNotifications,
    "./islands/sidebar.tsx": $sidebar,
    "./islands/tables/employeesTable.tsx": $tables_employeesTable,
    "./islands/timesheet/TimesheetCalendar.tsx": $timesheet_TimesheetCalendar,
    "./islands/timesheet/TimesheetOverview.tsx": $timesheet_TimesheetOverview,
    "./islands/widgets/AdminWidgets.tsx": $widgets_AdminWidgets,
    "./islands/widgets/FinWidgets.tsx": $widgets_FinWidgets,
    "./islands/widgets/HrWidgets.tsx": $widgets_HrWidgets,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
