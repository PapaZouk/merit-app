import {getConfig} from "../../components/utils/api-client/config/getConfig.ts";
import EmployeesManager from "../../islands/employees/EmployeesManager.tsx";

export default function createEmployee() {
    const createConfig = getConfig();

    return (
        <EmployeesManager createConfig={createConfig} />
    )
}