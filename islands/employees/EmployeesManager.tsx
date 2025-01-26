import EmployeeCreator from "../../components/employee/creator/EmployeeCreator.tsx";
import {useState} from "preact/hooks";
import {createElement} from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import {EmployeeFormData, initEmployeeFormData,} from "../../components/employee/types/EmployeeFormData.ts";
import {addEmployee, deleteEmployeeById} from "../../components/utils/api-client/clients/employeeClient.ts";
import {Employee} from "../../components/utils/api-client/types/Employee.ts";
import Popup from "../../components/popup/popup.tsx";
import createUserAccount from "../../components/utils/auth/accountManager.ts";
import {getAuthClient,} from "../../components/utils/auth/auth-client/authClient.ts";
import {addUser} from "../../components/utils/api-client/clients/userClient.ts";
import {jobTitles} from "../../components/employee/forms/utils/jobTitles.ts";
import {EventNotificationCreateRequest} from "../../components/utils/api-client/types/EventNotification.ts";
import createEventNotification from "../../components/utils/api-client/notifications/createEventNotification.ts";
import {useLogin} from "../../components/context/LoginProvider.tsx";
import {useNotifications} from "../../components/context/NotificationsProvider.tsx";

type EmployeesManagerProps = {
  createConfig: {
    url: string;
    token: string;
  };
};

export default function EmployeesManager(
  { createConfig }: EmployeesManagerProps,
) {
  const [employeeFormData, setEmployeeFormData] = useState<EmployeeFormData>(
    initEmployeeFormData,
  );
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { user } = useLogin();
  const { addNewEventNotification } = useNotifications();

  const handleChange = (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    let { name, value } = target;

    if (name === "phone") {
      value = value.replace(/[^0-9]/g, "");
      value = value.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");
    }

    setEmployeeFormData((prevData: EmployeeFormData) => ({
      ...prevData,
      endDate: "",
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: createElement.JSX.TargetedEvent<HTMLFormElement, Event>,
  ): Promise<void> => {
    e.preventDefault();

    const createEmployeeRequest: Employee = getEmployeeRequest(
      employeeFormData,
    );

    const employeeResponse = await addEmployee(
      createEmployeeRequest,
      createConfig.url,
      createConfig.token,
    );

    let userId = null;
    if (!employeeResponse.id) {
      throw new Error("Error: no employee response found");
    } else {
      userId = await createUserAccount(
        {
          email: employeeFormData.email,
          password: "password",
          userId: employeeResponse.id,
        },
        getAuthClient(),
      );
    }

    if (!userId) {
      await deleteEmployeeById(employeeResponse.id, createConfig.url, createConfig.token);
      throw new Error("Error: no user ID found. Failed to create user account");
    } else {
      const role = employeeFormData.jobTitle === jobTitles[4].value ? "hrmanager" : "hremployee";

      await addUser(
        {
          authId: userId,
          roles: ["guest", role],
        },
        createConfig.url,
        createConfig.token,
      );
    }

    const eventNotificationRequest: EventNotificationCreateRequest = createEventNotification(
        userId,
        "Dodano nowego pracownika",
        `Dodano nowego pracownika: ${employeeFormData.firstName} ${employeeFormData.lastName}`,
        "HR",
        user?.authId,
        ["hr", "manager"]
    );

    addNewEventNotification(eventNotificationRequest);

    setEmployeeFormData(initEmployeeFormData);

    globalThis.location.href = "/";
  };

  const handlePopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  const confirmSubmit = async () => {
    handlePopup();

    await handleSubmit(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      }) as createElement.JSX.TargetedEvent<HTMLFormElement, Event>,
    );
  };

  return (
    <div>
      <EmployeeCreator
        formData={employeeFormData}
        handleChange={handleChange}
        handleSubmit={confirmSubmit}
        handlePopup={handlePopup}
        isPopupOpened={isPopupOpened}
        errors={errors}
        setErrors={setErrors}
      />
      {isPopupOpened && (
        <Popup onClose={handlePopup}>
          <div class="p-4 space-y-4">
            <p class="mb-4 text-black">Czy na pewno chcesz zapisać dane?</p>
            <div class="flex space-x-4 justify-center">
              <button
                onClick={confirmSubmit}
                class="px-4 py-2 bg-green-500 text-black rounded text-center"
              >
                Tak
              </button>
              <button
                onClick={handlePopup}
                class="px-4 py-2 bg-red-500 text-black rounded text-center"
              >
                Nie
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
}

function getEmployeeRequest(employeeFormData: EmployeeFormData): Employee {
  if (employeeFormData.state1 instanceof Object) {
    employeeFormData.state1 = employeeFormData.state1.label;
  }
  if (employeeFormData.state2 instanceof Object) {
    employeeFormData.state2 = employeeFormData.state2.label;
  }
  if (employeeFormData.voivodeship1 instanceof Object) {
    employeeFormData.voivodeship1 = employeeFormData.voivodeship1.value;
  }
  if (employeeFormData.voivodeship2 instanceof Object) {
    employeeFormData.voivodeship2 = employeeFormData.voivodeship2.label;
  }

  return {
    _id: "",
    personalData: {
      firstName: employeeFormData.firstName,
      lastName: employeeFormData.lastName,
      email: employeeFormData.email,
      phone: employeeFormData.phone,
      pesel: employeeFormData.pesel,
      nip: employeeFormData.nip,
      clothSize: employeeFormData.clothSize,
      personalDataHistory: [],
      address1: {
        street1: employeeFormData.street1,
        house1: employeeFormData.house1,
        city1: employeeFormData.city1,
        zip1: employeeFormData.zip1,
        state1: employeeFormData.state1,
        voivodeship1: employeeFormData.voivodeship1,
        address1History: [],
      },
      address2: {
        street2: employeeFormData.street2,
        house2: employeeFormData.house2,
        city2: employeeFormData.city2,
        zip2: employeeFormData.zip2,
        state2: employeeFormData.state2,
        voivodeship2: employeeFormData.voivodeship2,
        address2History: [],
      },
    },
    jobDetails: {
      status: employeeFormData.status,
      jobTitle: employeeFormData.jobTitle,
      department: employeeFormData.department,
      startDate: employeeFormData.startDate,
      endDate: employeeFormData.endDate,
      contractType: employeeFormData.contractType,
      workSchedule: employeeFormData.workSchedule,
      insuranceType: employeeFormData.insuranceType,
      annualLeaveDays: Number.parseInt(
        String(employeeFormData.annualLeaveDays),
        10,
      ),
      jobDetailsHistory: [],
      salary: {
        baseSalary: Number.parseInt(String(employeeFormData.baseSalary), 10),
        currency: employeeFormData.currency,
        hourlyRate: Number.parseInt(String(employeeFormData.hourlyRate), 10),
        bankAccount: employeeFormData.bankAccount,
        bankName: employeeFormData.bankName,
        salaryHistory: [],
      },
    },
  };
}
