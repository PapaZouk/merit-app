import { useEffect, useState } from "preact/hooks";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import EmployeeAddress2Form from "../../../components/employee/update/EmployeeAddress2Form.tsx";
import { MouseEventHandler } from "npm:@types/react@18.3.17/index.d.ts";
import ConfirmPopupEvent from "../../../components/popup/ConfirmPopupEvent.tsx";
import createEventNotification from "../../../components/utils/api-client/notifications/createEventNotification.ts";
import { useLogin } from "../../../components/context/LoginProvider.tsx";
import { useNotifications } from "../../../components/context/NotificationsProvider.tsx";
import { emptyEmployeeData } from "../../../components/employee/utils/emptyEmployeeData.ts";
import { isAddress2Changed } from "../../../components/employee/update/utils/isAddress2Changed.ts";
import {
  createEmployeeAddress2UpdateRequest,
} from "../../../components/employee/update/utils/factories/createEmployeeAddress2UpdateRequest.ts";

type EmployeeUpdateAddress2Props = {
  employeeId: string;
};

export default function EmployeeUpdateAddress2(
  { employeeId }: EmployeeUpdateAddress2Props,
) {
  const [employeeData, setEmployeeData] = useState<Employee>(emptyEmployeeData);
  const [formData, setFormData] = useState({
    street2: employeeData.personalData.address2.street2 || "",
    house2: employeeData.personalData.address2.house2 || "",
    city2: employeeData.personalData.address2.city2 || "",
    zip2: employeeData.personalData.address2.zip2 || "",
    state2: employeeData.personalData.address2.state2 || "",
    voivodeship2: employeeData.personalData.address2.voivodeship2 || "",
  });
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const { userId, user } = useLogin();
  const { addNewEventNotification } = useNotifications();

  useEffect(() => {
    if (!employeeId) {
      throw new Error("Missing employeeId");
    }

    async function fetchEmployee() {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch employee");
        return;
      }

      const responseBody = await response.json();
      setEmployeeData(responseBody.result);
      setFormData({
        street2: responseBody.result.personalData.address2.street2,
        house2: responseBody.result.personalData.address2.house2,
        city2: responseBody.result.personalData.address2.city2,
        zip2: responseBody.result.personalData.address2.zip2,
        state2: responseBody.result.personalData.address2.state2,
        voivodeship2: responseBody.result.personalData.address2.voivodeship2,
      });
    }

    fetchEmployee();
  }, []);

  const handleChange = (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLSelectElement,
      Event
    >,
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (
    e:
      | createElement.JSX.TargetedEvent<HTMLFormElement, Event>
      | MouseEventHandler<HTMLButtonElement>,
  ): void => {
    e.preventDefault();
    handlePopup();
  };

  const handlePopup = (): void => {
    setIsPopupOpened((prev) => !prev);
  };

  const confirmSubmit = async (): Promise<void> => {
    setIsPopupOpened(false);
    await handleSubmit(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      }) as createElement.JSX.TargetedEvent<HTMLFormElement, Event>,
    );
  };

  const handleSubmit = async (
    e: createElement.JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();

    const hasAddress2Changed = isAddress2Changed(formData, employeeData);

    const updatedData: Employee = createEmployeeAddress2UpdateRequest(
      formData,
      employeeData,
      hasAddress2Changed,
    );

    await fetch(`/api/employees/update/${updatedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const eventNotificationRequest = createEventNotification(
      userId,
      "Zmiana danych adresu korespondencyjnego",
      `Dane adresu korespondencyjnego pracownika ${employeeData.personalData.firstName} ${employeeData.personalData.lastName} zostały zmienione`,
      "HR",
      user?.authId,
      ["hr", "hrmanager"],
    );

    addNewEventNotification(eventNotificationRequest);

    globalThis.location.href = `/hr/employee/${updatedData._id}`;
  };

  return (
    <>
      <EmployeeAddress2Form
        employeeData={employeeData}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleUpdate}
      />
      {isPopupOpened && (
        <ConfirmPopupEvent
          title={"Czy na pewno chcesz zapisać zmiany?"}
          onConfirm={confirmSubmit}
          onCancel={handlePopup}
        />
      )}
    </>
  );
}
