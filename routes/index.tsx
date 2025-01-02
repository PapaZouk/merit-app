import Widget2 from '../components/widgets/Widget2.tsx';
import Widget3 from '../components/widgets/Widget3.tsx';
import EmployeesOverview from '../islands/employees/EmployeesOverview.tsx';
import { getEmployees } from '../components/utils/api-client/client.ts';
import { Employee } from '../components/utils/api-client/types/Employee.ts';

export default async function Home() {
  const employees = await getEmployees();
  const employeesData = await employees.result as Employee[];

  const widgetConfig = [
    {
      id: '1',
      Component: () => <EmployeesOverview employees={employeesData} />,
      size: 'col-span-1 md:col-span-3',
    },
    { id: '2', Component: () => <Widget2 />, size: 'col-span-1 md:col-span-2' },
    { id: '3', Component: () => <Widget3 />, size: 'col-span-1 md:col-span-1' },
    { id: '4', Component: () => <Widget3 />, size: 'col-span-1 md:col-span-3' },
  ];

  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
      {widgetConfig.map((Widget) => (
        <div
          key={Widget.id}
          class={`${Widget.size} bg-white p-4 shadow rounded-lg`}
        >
          <Widget.Component />
        </div>
      ))}
    </div>
  );
}