import EmployeesManager from "../EmployeesManager.tsx";
import {NotificationsProvider} from "../../../components/context/NotificationsProvider.tsx";
import {useLogin} from "../../../components/context/LoginProvider.tsx";

export default function CreateNewEmployee() {
    const { userId } = useLogin();
    return (
        <NotificationsProvider userId={userId}>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
                <div class="col-span-3 bg-white p-4 shadow rounded-lg">
                    <EmployeesManager />
                </div>
            </div>
        </NotificationsProvider>
    )
}