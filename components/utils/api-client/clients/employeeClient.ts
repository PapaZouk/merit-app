import { getCachedData, setCachedData } from "../../cache/cacheManager.ts";
import { getApiConfig } from "../config/getApiConfig.ts";
import { Employee } from "../types/Employee.ts";

export async function getEmployees(cacheTimeout?: string | undefined) {
  const cacheKey = "employeesCache_01";
  const cachedData = await getCachedData(cacheKey, cacheTimeout ?? "60");

  if (cachedData) {
    return cachedData;
  }

  const { url, token } = getApiConfig();
  const response = await fetch(`${url}/api/auth/employee/all`, {
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    console.log('Found 0 employees: ', response);
    return [];
  }

  if (response.status === 500) {
    console.log('Failed to fetch employees: ', response);
    throw new Error("Failed to fetch employees");
  }

  const data = await response.json();
  setCachedData<Employee>(cacheKey, data);

  return data;
}

export async function getAllEmployeesWithIds(
  ids: string[],
  cacheTimeout?: string | undefined,
) {
  const cacheKey = `employeesWithIdsCache_${ids.join("_")}`;
  const cachedData = await getCachedData(cacheKey, cacheTimeout ?? "60");

  if (cachedData) {
    return cachedData;
  }
  const { url, token } = getApiConfig();

  const formatedUrl = `${url}/api/auth/employee/filter/all?ids=${
    ids.join(",")
  }`;

  const response = await fetch(formatedUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    console.log('Found 0 employees: ', response);
    return [];
  }

  if (response.status === 500) {
    console.log('Failed to fetch employees: ', response);
    throw new Error("Failed to fetch employees");
  }

  const data = await response.json();
  setCachedData<Employee>(cacheKey, data);

  return data;
}

export async function getEmployeeById(id: string) {
  const cacheKey = `employeeCache_${id}`;
  const cachedData = await getCachedData(cacheKey, "60");

  if (cachedData) {
    return cachedData;
  }

  const { url, token } = getApiConfig();
  const response = await fetch(`${url}/api/auth/employee/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    console.log('Found 0 employee: ', response);
    return null;
  }

  if (response.status === 500) {
    console.log('Failed to fetch employee: ', response);
    throw new Error("Failed to fetch employee");
  }

  return response.json();
}

export async function updateEmployeeById(
  id: string,
  employeeData: Employee
) {
  const { url, token } = getApiConfig();
  const response = await fetch(`${url}/api/auth/employee/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(employeeData),
  });

  if (response.status === 404) {
    console.log(`Found 0 employee with ID: ${id}`, response);
    return null;
  }

  if (response.status === 500) {
    console.log(`Failed to update employee with ID: ${id}`, response);
    throw new Error("Failed to update employee");
  }

  return response.json();
}

export async function addEmployee(employeeData: Employee) {
  const { url, token } = getApiConfig();
  const response = await fetch(`${url}/api/auth/employee/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(employeeData),
  });

  if (response.status !== 200) {
    throw new Error("Failed to add employee");
  }

  return response.json();
}

export async function deleteEmployeeById(id: string) {
  const { url, token } = getApiConfig();
  const response = await fetch(`${url}/api/auth/employee/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    console.log(`Found 0 employee with ID: ${id}`, response);
    return null;
  }

  if (response.status === 500) {
    console.log(`Failed to delete employee with ID: ${id}`, response);
    throw new Error("Failed to delete employee");
  }

  return response.json();
}
