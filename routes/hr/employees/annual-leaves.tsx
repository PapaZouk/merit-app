import {LoginProvider} from "../../../components/context/LoginProvider.tsx";
import AnnualLeavesOverview from "../../../islands/employees/holidays/AnnualLeavesOverview.tsx";

export default function AnnualLeavesPage() {
    return (
        <LoginProvider>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
                <div class="col-span-3 bg-white p-4 shadow rounded-lg">
                    <AnnualLeavesOverview />
                </div>
            </div>
        </LoginProvider>
)
}