import EmployeesOverview from "../employees/EmployeesOverview.tsx";
import EmployeesManager from "../employees/EmployeesManager.tsx";
import Widget3 from "../../components/widgets/Widget3.tsx";
import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import Widget2 from "../../components/widgets/Widget2.tsx";

type HrWidgetsProps = {
  employeesData: Employee[];
  config: {
    url: string;
    token: string;
  };
};

export function HrWidgets({ employeesData, config }: HrWidgetsProps) {
  const widgets = [
    {
      id: "1",
      Component: () => <EmployeesOverview employees={employeesData} config={config} />,
      size: "col-span-1 md:col-span-4",
    },
    { id: "2", Component: () => <Widget2 />, size: "col-span-1 md:col-span-2" },
    { id: "3", Component: () => <Widget3 />, size: "col-span-1 md:col-span-2" },
  ];

  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 h-full w-full">
      {widgets.map((Widget) => (
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
