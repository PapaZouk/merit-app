import EmployeeCreator from "../../components/employee/creator/EmployeeCreator.tsx";
import { useState } from "preact/hooks";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import {
  EmployeeFormData,
  initEmployeeFormData,
} from "../../components/employee/types/EmployeeFormData.ts";
import { deleteEmployeeById } from "../../components/utils/api-client/clients/employeeClient.ts";
import { Employee } from "../../components/utils/api-client/types/Employee.ts";
import Popup from "../../components/popup/popup.tsx";
import createUserAccount from "../../components/utils/auth/accountManager.ts";
import { getAuthClient } from "../../components/utils/auth/auth-client/authClient.ts";
import createEventNotification from "../../components/utils/api-client/notifications/createEventNotification.ts";
import { useLogin } from "../../components/context/LoginProvider.tsx";
import { useNotifications } from "../../components/context/NotificationsProvider.tsx";
import {
  mapEmployeeFormDataToUserRole,
} from "../../components/utils/api-client/mappers/mapEmployeeFormDataToUserRole.ts";
import {
  EmployeeEventTagsEnum,
  RoleTagsEnum,
} from "../../components/notifications/types/RoleTagsEnum.ts";
import { createNewEmployeeRequest } from "../../components/employee/creator/utils/createNewEmployeeRequest.ts";
import ConfirmAction from "../../components/popup/ConfirmAction.tsx";

export default function EmployeesManager() {
  const [employeeFormData, setEmployeeFormData] = useState<EmployeeFormData>(
    initEmployeeFormData,
  );
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { userId } = useLogin();
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

    const createEmployeeRequest: Employee = createNewEmployeeRequest(
      employeeFormData,
    );

    const employeeResponse = await fetch("/api/employees/add/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createEmployeeRequest),
    });

    if (employeeResponse.status !== 200) {
      throw new Error("Failed to add employee");
    }

    const employeeResponseBody = await employeeResponse.json();

    let newUserId = null;
    let role = null;
    if (!employeeResponseBody.id) {
      throw new Error("Error: no employee response found");
    } else {
      role = mapEmployeeFormDataToUserRole(employeeFormData);

      newUserId = await createUserAccount(
        {
          email: employeeFormData.email,
          password: "password",
          userId: employeeResponseBody.id,
          role: role,
        },
        getAuthClient(),
      );
    }

    if (!newUserId) {
      await deleteEmployeeById(employeeResponseBody.id);
      throw new Error("Error: no user ID found. Failed to create user account");
    } else {
      await fetch("/api/users/add/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authId: userId,
          roles: [role],
        }),
      });
    }

    addNewEventNotification(createEventNotification(
      userId,
      "Dodano nowego pracownika",
      `Dodano nowego pracownika: ${employeeFormData.firstName} ${employeeFormData.lastName}`,
      "HR",
      [RoleTagsEnum.HR, EmployeeEventTagsEnum.ADDED],
    ));

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
          <ConfirmAction
            handleConfirm={confirmSubmit}
            handleDecline={handlePopup}
            message={"Czy na pewno chcesz zapisać dane?"}
          />
        </Popup>
      )}
    </div>
  );
}
