import EmployeesManager from "../EmployeesManager.tsx";
import {AuthConfig} from "../../../components/utils/auth/auth-client/getAuthConfig.ts";
import {NotificationsProvider} from "../../../components/context/NotificationsProvider.tsx";
import {useLogin} from "../../../components/context/LoginProvider.tsx";

type CreateNewEmployeeProps = {
    apiConfig: {
        url: string;
        token: string;
    };
    authConfig: AuthConfig;
}

export default function CreateNewEmployee({ apiConfig, authConfig }: CreateNewEmployeeProps) {
    const { userId } = useLogin();
    return (
        <NotificationsProvider userId={userId} apiConfig={apiConfig}>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
                <div class="col-span-3 bg-white p-4 shadow rounded-lg">
                    <EmployeesManager createConfig={apiConfig} authConfig={{config: authConfig}}/>
                </div>
            </div>
        </NotificationsProvider>
    )
}