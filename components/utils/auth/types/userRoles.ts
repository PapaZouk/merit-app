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
  HR_MANAGER = "hrmanager",
  HR_EMPLOYEE = "hremployee",
  FINANCE_MANAGER = "finmanager",
  OFFICE_MANAGER = "officemanager",
  USER = "user",
  GUEST = "guest",
}
