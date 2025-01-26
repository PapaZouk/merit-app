import { EmployeeFormData } from "../../../employee/types/EmployeeFormData.ts";
import { EmployeeJobTitle } from "../../../employee/types/EmployeeJobTitle.ts";
import { UserRoleEnum } from "../../auth/types/userRoles.ts";

export const mapEmployeeFormDataToUserRole = (employee: EmployeeFormData) => {
  switch (employee.jobTitle) {
    case EmployeeJobTitle.COO:
      return UserRoleEnum.ADMIN;
    case EmployeeJobTitle.CFO:
      return UserRoleEnum.MANAGER;
    case EmployeeJobTitle.HR_MANAGER:
      return UserRoleEnum.HR_MANAGER;
    case EmployeeJobTitle.SALES_MANAGER:
      return UserRoleEnum.SALES_MANAGER;
    case EmployeeJobTitle.MARKETING_SPECIALIST:
      return UserRoleEnum.MARKETING_SPECIALIST;
    case EmployeeJobTitle.ACCOUNTANT:
      return UserRoleEnum.FINANCE_MANAGER;
    case EmployeeJobTitle.ASSISTANT:
      return UserRoleEnum.OFFICE_MANAGER;
    case EmployeeJobTitle.TINSMITH:
    case EmployeeJobTitle.FITTER:
      return UserRoleEnum.USER;
    default:
      return UserRoleEnum.GUEST;
  }
};
