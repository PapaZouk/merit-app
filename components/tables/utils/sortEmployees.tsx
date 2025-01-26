import { Employee } from "../../utils/api-client/types/Employee.ts";

export const sortEmployees = (
  sortedEmployees: Employee[],
  key: keyof Employee["personalData"] | keyof Employee["jobDetails"],
  isAscending: boolean,
): Employee[] => {
  return [...sortedEmployees].sort((a, b) => {
    const aValue = key in a.personalData
      ? a.personalData[key as keyof Employee["personalData"]]
      : a.jobDetails[key as keyof Employee["jobDetails"]];
    const bValue = key in b.personalData
      ? b.personalData[key as keyof Employee["personalData"]]
      : b.jobDetails[key as keyof Employee["jobDetails"]];

    if (aValue === null || aValue === undefined) return isAscending ? 1 : -1;
    if (bValue === null || bValue === undefined) return isAscending ? -1 : 1;

    if (aValue < bValue) {
      return isAscending ? -1 : 1;
    }
    if (aValue > bValue) {
      return isAscending ? 1 : -1;
    }
    return 0;
  });
}
