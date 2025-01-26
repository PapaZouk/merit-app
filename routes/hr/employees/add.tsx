import CreateNewEmployee from "../../../islands/employees/add/CreateNewEmployee.tsx";
import {LoginProvider} from "../../../components/context/LoginProvider.tsx";

export default function AddEmployeePage() {
  return (
      <LoginProvider>
          <CreateNewEmployee />
      </LoginProvider>
  );
}
