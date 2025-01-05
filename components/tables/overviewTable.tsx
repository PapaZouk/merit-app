import {Employee} from "../utils/api-client/types/Employee.ts";
import CheckButton from "../buttons/CheckButton.tsx";
import {getJobTitle} from "../employee/mappers/getJobTitleMapper.ts";
import {getDepartment} from "../employee/mappers/getDepartmentMapper.ts";

type OverviewTableProps = {
    employees: Employee[];
}

export default function OverviewTable({employees}: { employees: Employee[] }) {
    return (
        <table class="min-w-full bg-gray-700 rounded-lg overflow-hidden">
            <thead>
            <tr class="bg-gray-600 text-white">
                <th class="py-2 px-4 text-left">Imię</th>
                <th class="py-2 px-4 text-left">Nazwisko</th>
                <th class="py-2 px-4 text-left hidden lg:table-cell">Stanowisko</th>
                <th class="py-2 px-4 text-left hidden lg:table-cell">Dział</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {employees && employees.map((employee: Employee) => (
                <tr
                    key={employee._id}
                    class="border-b border-gray-600 text-gray-300 hover:bg-gray-600"
                >
                    <td class="py-2 px-4">{employee.personalData.firstName}</td>
                    <td class="py-2 px-4">{employee.personalData.lastName}</td>
                    <td class="py-2 px-4 hidden lg:table-cell">{getJobTitle(employee)}</td>
                    <td class="py-2 px-4 hidden lg:table-cell">{getDepartment(employee)}</td>
                    <td class="py-2 px-4">
                        <CheckButton href={`/employee/${employee._id}`} />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}