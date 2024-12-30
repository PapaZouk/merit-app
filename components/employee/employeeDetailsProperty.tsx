type EmployeeDetailsPropertyProps = {
  name: string;
  employeeData: string | number | null;
};

export default function EmployeeDetailsProperty({
  name,
  employeeData,
}: EmployeeDetailsPropertyProps) {
  return (
    <div class="mb-2 py-1 flex justify-between items-center border-b border-gray-200">
      <strong class="text-gray-700">{name}</strong>
      <span class="text-gray-500">{employeeData ? employeeData : "Brak danych"}</span>
    </div>
  );
}