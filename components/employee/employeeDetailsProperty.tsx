type EmployeeDetailsPropertyProps = {
  name: string;
  employeeData: string | number | null | undefined;
};

export default function EmployeeDetailsProperty({
  name,
  employeeData,
}: EmployeeDetailsPropertyProps) {
    if (!employeeData) {
        employeeData = "Brak danych";
    }
  return (
    <div class="mb-2 py-1 flex flex-col sm:flex-row justify-between
     items-start sm:items-center border-b border-gray-200">
      <strong class="text-gray-700 mb-1 sm:mb-0">{name}</strong>
      <span class="text-gray-500">{employeeData}</span>
    </div>
  );
}