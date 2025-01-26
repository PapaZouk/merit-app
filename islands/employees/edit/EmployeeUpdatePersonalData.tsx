import EmployeePersonalDataForm from "../../../components/employee/forms/EmployeePersonalDataForm.tsx";
import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import { updateEmployeeById } from "../../../components/utils/api-client/clients/employeeClient.ts";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { useState, useEffect } from "preact/hooks";
import { MouseEventHandler } from "npm:@types/react@18.3.17/index.d.ts";
import ConfirmPopupEvent from "../../../components/popup/ConfirmPopupEvent.tsx";
import {EventNotificationCreateRequest} from "../../../components/utils/api-client/types/EventNotification.ts";
import createEventNotification from "../../../components/utils/api-client/notifications/createEventNotification.ts";
import {useLogin} from "../../../components/context/LoginProvider.tsx";
import {useNotifications} from "../../../components/context/NotificationsProvider.tsx";
import {emptyEmployeeData} from "../../../components/employee/utils/emptyEmployeeData.ts";

type EmployeeUpdateProps = {
  employeeId: string;
};

export default function EmployeeUpdatePersonalData(
  { employeeId }: EmployeeUpdateProps,
) {
  const [employeeData, setEmployeeData] = useState<Employee>(emptyEmployeeData);
  const [formData, setFormData] = useState({
    firstName: employeeData.personalData.firstName,
    lastName: employeeData.personalData.lastName,
    email: employeeData.personalData.email,
    phone: employeeData.personalData.phone,
    pesel: employeeData.personalData.pesel,
    clothSize: employeeData.personalData.clothSize,
    nip: employeeData.personalData.nip ?? 0,
  });
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const { userId, user } = useLogin();
  const { addNewEventNotification } = useNotifications();

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
        firstName: responseBody.result.personalData.firstName,
        lastName: responseBody.result.personalData.lastName,
        email: responseBody.result.personalData.email,
        phone: responseBody.result.personalData.phone,
        pesel: responseBody.result.personalData.pesel,
        clothSize: responseBody.result.personalData.clothSize,
        nip: responseBody.result.personalData.nip,
      });
    }

    fetchEmployee();
  }, []);

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

    const hasPersonalDataChanged =
      formData.firstName !== employeeData.personalData.firstName ||
      formData.lastName !== employeeData.personalData.lastName ||
      formData.email !== employeeData.personalData.email ||
      formData.phone !== employeeData.personalData.phone ||
      formData.pesel !== employeeData.personalData.pesel ||
      formData.clothSize !== employeeData.personalData.clothSize ||
      formData.nip !== employeeData.personalData.nip;

    const updatedData: Employee = {
      _id: employeeData._id,
      personalData: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        pesel: formData.pesel,
        clothSize: formData.clothSize,
        nip: formData.nip,
        address1: employeeData.personalData.address1,
        address2: employeeData.personalData.address2,
        personalDataHistory: hasPersonalDataChanged
          ? [
            ...employeeData.personalData.personalDataHistory,
            {
              firstNameBefore: employeeData.personalData.firstName,
              firstNameAfter: formData.firstName,
              lastNameBefore: employeeData.personalData.lastName,
              lastNameAfter: formData.lastName,
              emailBefore: employeeData.personalData.email,
              emailAfter: formData.email,
              phoneBefore: employeeData.personalData.phone,
              phoneAfter: formData.phone,
              peselBefore: employeeData.personalData.pesel,
              peselAfter: formData.pesel,
              clothSizeBefore: employeeData.personalData.clothSize,
              clothSizeAfter: formData.clothSize,
              nipBefore: employeeData.personalData.nip,
              nipAfter: formData.nip,
              changeDate: new Date().toISOString(),
            },
          ]
          : employeeData.personalData.personalDataHistory,
      },
      jobDetails: {
        ...employeeData.jobDetails,
        salary: { ...employeeData.jobDetails.salary },
      },
    };

    await fetch(`/api/employees/update/${updatedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const eventNotificationRequest: EventNotificationCreateRequest = createEventNotification(
      userId,
      "Zmiana danych osobowych",
      `Dane osobowe pracownika ${employeeData.personalData.firstName} ${employeeData.personalData.lastName} zostały zmienione`,
      "HR",
      user?.authId,
      ["hr", "hrmanager"],
    );

    addNewEventNotification(eventNotificationRequest);

    globalThis.location.href = `/hr/employee/${updatedData._id}`;
  };

  return (
    <>
      <EmployeePersonalDataForm
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
