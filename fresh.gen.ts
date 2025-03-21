// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_403 from "./routes/_403.tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_employees_id_ from "./routes/api/employees/[id].tsx";
import * as $api_employees_add_employee from "./routes/api/employees/add/employee.tsx";
import * as $api_employees_all from "./routes/api/employees/all.tsx";
import * as $api_employees_delete_id_ from "./routes/api/employees/delete/[id].tsx";
import * as $api_employees_list_filter from "./routes/api/employees/list/filter.tsx";
import * as $api_employees_update_id_ from "./routes/api/employees/update/[id].tsx";
import * as $api_notifications_userId_ from "./routes/api/notifications/[userId].tsx";
import * as $api_notifications_add_notification from "./routes/api/notifications/add/notification.tsx";
import * as $api_notifications_update_all from "./routes/api/notifications/update/all.tsx";
import * as $api_notifications_update_notification from "./routes/api/notifications/update/notification.tsx";
import * as $api_timesheet_id_ from "./routes/api/timesheet/[id].tsx";
import * as $api_timesheet_all from "./routes/api/timesheet/all.tsx";
import * as $api_timesheet_annual_leaves_year_ from "./routes/api/timesheet/annual-leaves/[year].tsx";
import * as $api_timesheet_create from "./routes/api/timesheet/create.tsx";
import * as $api_timesheet_update_id_ from "./routes/api/timesheet/update/[id].tsx";
import * as $api_users_id_ from "./routes/api/users/[id].tsx";
import * as $api_users_add_user from "./routes/api/users/add/user.tsx";
import * as $api_users_roles_id_ from "./routes/api/users/roles/[id].tsx";
import * as $api_users_update_id_ from "./routes/api/users/update/[id].tsx";
import * as $api_utils_isValidRequestOrigin from "./routes/api/utils/isValidRequestOrigin.ts";
import * as $hr_employee_id_ from "./routes/hr/employee/[id].tsx";
import * as $hr_employee_edit_address1_id_ from "./routes/hr/employee/edit/address1/[id].tsx";
import * as $hr_employee_edit_address2_id_ from "./routes/hr/employee/edit/address2/[id].tsx";
import * as $hr_employee_edit_jobdetails_id_ from "./routes/hr/employee/edit/jobdetails/[id].tsx";
import * as $hr_employee_edit_jobstayaddress_id_ from "./routes/hr/employee/edit/jobstayaddress/[id].tsx";
import * as $hr_employee_edit_personal_id_ from "./routes/hr/employee/edit/personal/[id].tsx";
import * as $hr_employee_edit_salary_id_ from "./routes/hr/employee/edit/salary/[id].tsx";
import * as $hr_employees_add from "./routes/hr/employees/add.tsx";
import * as $hr_employees_overview from "./routes/hr/employees/overview.tsx";
import * as $hr_timesheet_annual_leaves from "./routes/hr/timesheet/annual-leaves.tsx";
import * as $hr_timesheet_calendar_id_ from "./routes/hr/timesheet/calendar/[id].tsx";
import * as $hr_timesheet_overview from "./routes/hr/timesheet/overview.tsx";
import * as $index from "./routes/index.tsx";
import * as $user_notifications_id_ from "./routes/user/notifications/[id].tsx";
import * as $user_settings_general from "./routes/user/settings/general.tsx";
import * as $auth_ChallengeOtp from "./islands/auth/ChallengeOtp.tsx";
import * as $auth_GenerateQRCode from "./islands/auth/GenerateQRCode.tsx";
import * as $auth_OtpAuth from "./islands/auth/OtpAuth.tsx";
import * as $auth_login from "./islands/auth/login.tsx";
import * as $employees_EmployeesManager from "./islands/employees/EmployeesManager.tsx";
import * as $employees_EmployeesOverview from "./islands/employees/EmployeesOverview.tsx";
import * as $employees_EmployeesTable from "./islands/employees/EmployeesTable.tsx";
import * as $employees_add_CreateNewEmployee from "./islands/employees/add/CreateNewEmployee.tsx";
import * as $employees_edit_EmployeeUpdateAddress1 from "./islands/employees/edit/EmployeeUpdateAddress1.tsx";
import * as $employees_edit_EmployeeUpdateAddress2 from "./islands/employees/edit/EmployeeUpdateAddress2.tsx";
import * as $employees_edit_EmployeeUpdateJobDetails from "./islands/employees/edit/EmployeeUpdateJobDetails.tsx";
import * as $employees_edit_EmployeeUpdateJobStayAddress from "./islands/employees/edit/EmployeeUpdateJobStayAddress.tsx";
import * as $employees_edit_EmployeeUpdatePersonalData from "./islands/employees/edit/EmployeeUpdatePersonalData.tsx";
import * as $employees_edit_EmployeeUpdateSalary from "./islands/employees/edit/EmployeeUpdateSalary.tsx";
import * as $employees_employeeDetails from "./islands/employees/employeeDetails.tsx";
import * as $employees_holidays_AnnualLeavesOverview from "./islands/employees/holidays/AnnualLeavesOverview.tsx";
import * as $layouts_PageContent from "./islands/layouts/PageContent.tsx";
import * as $layouts_RootLayout from "./islands/layouts/RootLayout.tsx";
import * as $layouts_WidgetsLayout from "./islands/layouts/WidgetsLayout.tsx";
import * as $mainNavigation from "./islands/mainNavigation.tsx";
import * as $notifications_event_EventNotifications from "./islands/notifications/event/EventNotifications.tsx";
import * as $sidebar from "./islands/sidebar.tsx";
import * as $timesheet_TimesheetCalendar from "./islands/timesheet/TimesheetCalendar.tsx";
import * as $timesheet_TimesheetOverview from "./islands/timesheet/TimesheetOverview.tsx";
import * as $user_settings_UserSettings from "./islands/user/settings/UserSettings.tsx";
import * as $user_settings_tabs_PasswordSettings from "./islands/user/settings/tabs/PasswordSettings.tsx";
import * as $user_settings_tabs_SecuritySettings from "./islands/user/settings/tabs/SecuritySettings.tsx";
import * as $widgets_AdminWidgets from "./islands/widgets/AdminWidgets.tsx";
import * as $widgets_FinWidgets from "./islands/widgets/FinWidgets.tsx";
import * as $widgets_HrWidgets from "./islands/widgets/HrWidgets.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_403.tsx": $_403,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/employees/[id].tsx": $api_employees_id_,
    "./routes/api/employees/add/employee.tsx": $api_employees_add_employee,
    "./routes/api/employees/all.tsx": $api_employees_all,
    "./routes/api/employees/delete/[id].tsx": $api_employees_delete_id_,
    "./routes/api/employees/list/filter.tsx": $api_employees_list_filter,
    "./routes/api/employees/update/[id].tsx": $api_employees_update_id_,
    "./routes/api/notifications/[userId].tsx": $api_notifications_userId_,
    "./routes/api/notifications/add/notification.tsx":
      $api_notifications_add_notification,
    "./routes/api/notifications/update/all.tsx": $api_notifications_update_all,
    "./routes/api/notifications/update/notification.tsx":
      $api_notifications_update_notification,
    "./routes/api/timesheet/[id].tsx": $api_timesheet_id_,
    "./routes/api/timesheet/all.tsx": $api_timesheet_all,
    "./routes/api/timesheet/annual-leaves/[year].tsx":
      $api_timesheet_annual_leaves_year_,
    "./routes/api/timesheet/create.tsx": $api_timesheet_create,
    "./routes/api/timesheet/update/[id].tsx": $api_timesheet_update_id_,
    "./routes/api/users/[id].tsx": $api_users_id_,
    "./routes/api/users/add/user.tsx": $api_users_add_user,
    "./routes/api/users/roles/[id].tsx": $api_users_roles_id_,
    "./routes/api/users/update/[id].tsx": $api_users_update_id_,
    "./routes/api/utils/isValidRequestOrigin.ts":
      $api_utils_isValidRequestOrigin,
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
    "./routes/hr/timesheet/annual-leaves.tsx": $hr_timesheet_annual_leaves,
    "./routes/hr/timesheet/calendar/[id].tsx": $hr_timesheet_calendar_id_,
    "./routes/hr/timesheet/overview.tsx": $hr_timesheet_overview,
    "./routes/index.tsx": $index,
    "./routes/user/notifications/[id].tsx": $user_notifications_id_,
    "./routes/user/settings/general.tsx": $user_settings_general,
  },
  islands: {
    "./islands/auth/ChallengeOtp.tsx": $auth_ChallengeOtp,
    "./islands/auth/GenerateQRCode.tsx": $auth_GenerateQRCode,
    "./islands/auth/OtpAuth.tsx": $auth_OtpAuth,
    "./islands/auth/login.tsx": $auth_login,
    "./islands/employees/EmployeesManager.tsx": $employees_EmployeesManager,
    "./islands/employees/EmployeesOverview.tsx": $employees_EmployeesOverview,
    "./islands/employees/EmployeesTable.tsx": $employees_EmployeesTable,
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
    "./islands/employees/holidays/AnnualLeavesOverview.tsx":
      $employees_holidays_AnnualLeavesOverview,
    "./islands/layouts/PageContent.tsx": $layouts_PageContent,
    "./islands/layouts/RootLayout.tsx": $layouts_RootLayout,
    "./islands/layouts/WidgetsLayout.tsx": $layouts_WidgetsLayout,
    "./islands/mainNavigation.tsx": $mainNavigation,
    "./islands/notifications/event/EventNotifications.tsx":
      $notifications_event_EventNotifications,
    "./islands/sidebar.tsx": $sidebar,
    "./islands/timesheet/TimesheetCalendar.tsx": $timesheet_TimesheetCalendar,
    "./islands/timesheet/TimesheetOverview.tsx": $timesheet_TimesheetOverview,
    "./islands/user/settings/UserSettings.tsx": $user_settings_UserSettings,
    "./islands/user/settings/tabs/PasswordSettings.tsx":
      $user_settings_tabs_PasswordSettings,
    "./islands/user/settings/tabs/SecuritySettings.tsx":
      $user_settings_tabs_SecuritySettings,
    "./islands/widgets/AdminWidgets.tsx": $widgets_AdminWidgets,
    "./islands/widgets/FinWidgets.tsx": $widgets_FinWidgets,
    "./islands/widgets/HrWidgets.tsx": $widgets_HrWidgets,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
