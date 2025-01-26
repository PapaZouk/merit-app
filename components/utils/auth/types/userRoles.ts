export type UserRole =
  | UserRoleEnum.ADMIN
  | UserRoleEnum.HR_MANAGER
  | UserRoleEnum.HR_EMPLOYEE
  | UserRoleEnum.FINANCE_MANAGER
  | UserRoleEnum.OFFICE_MANAGER
  | UserRoleEnum.USER
  | UserRoleEnum.GUEST;

export enum UserRoleEnum {
  ADMIN = "admin",
  MANAGER = "manager",
  HR_MANAGER = "hrmanager",
  HR_EMPLOYEE = "hremployee",
  MARKETING_SPECIALIST = "marketingspecialist",
  SALES_MANAGER = "salesmanager",
  FINANCE_MANAGER = "finmanager",
  OFFICE_MANAGER = "officemanager",
  USER = "user",
  GUEST = "guest",
}
