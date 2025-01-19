import { useState } from "preact/hooks";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import { updateEmployeeById } from "../../../components/utils/api-client/clients/employeeClient.ts";
import { MouseEventHandler } from "npm:@types/react@18.3.17/index.d.ts";
import ConfirmPopupEvent from "../../../components/popup/ConfirmPopupEvent.tsx";
import EmployeeJobStayAddressForm from "../../../components/employee/forms/EmployeeJobStayAddressForm.tsx";
import { useLogin } from "../../context/LoginProvider.tsx";
import { useNotifications } from "../../context/NotificationsProvider.tsx";
import {EventNotificationCreateRequest} from "../../../components/utils/api-client/types/EventNotification.ts";
import createEventNotification from "../../../components/utils/api-client/notifications/createEventNotification.ts";

type EmployeeUpdateJobStayAddressProps = {
  employeeData: Employee;
  updateConfig: {
    url: string;
    token: string;
  };
};

export default function EmployeeUpdateJobStayAddress({
  employeeData,
  updateConfig,
}: EmployeeUpdateJobStayAddressProps) {
  const [formData, setFormData] = useState({
    jobStayAddressStreet: employeeData.jobDetails.jobStayAddress?.street ??
      "Brak danych",
    jobStayAddressHouse: employeeData.jobDetails.jobStayAddress?.house ??
      "Brak danych",
    jobStayAddressCity: employeeData.jobDetails.jobStayAddress?.city ??
      "Brak danych",
    jobStayAddressZip: employeeData.jobDetails.jobStayAddress?.zip ??
      "Brak danych",
    jobStayAddressState: employeeData.jobDetails.jobStayAddress?.state ??
      "Brak danych",
    jobStayAddressVoivodeship:
      employeeData.jobDetails.jobStayAddress?.voivodeship ?? "Brak danych",
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

    const hasJobStayAddressChanged =
      formData.jobStayAddressStreet !==
        employeeData.jobDetails.jobStayAddress?.street ||
      formData.jobStayAddressHouse !==
        employeeData.jobDetails.jobStayAddress?.house ||
      formData.jobStayAddressHouse !==
        employeeData.jobDetails.jobStayAddress?.city ||
      formData.jobStayAddressZip !==
        employeeData.jobDetails.jobStayAddress?.zip ||
      formData.jobStayAddressState !==
        employeeData.jobDetails.jobStayAddress?.state ||
      formData.jobStayAddressVoivodeship !==
        employeeData.jobDetails.jobStayAddress?.voivodeship;

    const updatedData: Employee = {
      _id: employeeData._id,
      personalData: employeeData.personalData,
      jobDetails: {
        ...employeeData.jobDetails,
        jobStayAddress: {
          street: formData.jobStayAddressStreet,
          house: formData.jobStayAddressHouse,
          city: formData.jobStayAddressCity,
          zip: formData.jobStayAddressZip,
          state: formData.jobStayAddressState,
          voivodeship: formData.jobStayAddressVoivodeship,
          jobStayAddressHistory: hasJobStayAddressChanged
            ? [
              ...employeeData.jobDetails.jobStayAddress
                ?.jobStayAddressHistory ?? [],
              {
                streetBefore: employeeData.jobDetails.jobStayAddress?.street,
                streetAfter: formData.jobStayAddressStreet,
                houseBefore: employeeData.jobDetails.jobStayAddress?.house,
                houseAfter: formData.jobStayAddressHouse,
                cityBefore: employeeData.jobDetails.jobStayAddress?.city,
                cityAfter: formData.jobStayAddressCity,
                stateBefore: employeeData.jobDetails.jobStayAddress?.state,
                stateAfter: formData.jobStayAddressState,
                zipBefore: employeeData.jobDetails.jobStayAddress?.zip,
                zipAfter: formData.jobStayAddressZip,
                voivodeshipBefore: employeeData.jobDetails.jobStayAddress
                  ?.voivodeship,
                voivodeshipAfter: formData.jobStayAddressVoivodeship,
                changeDate: new Date().toISOString(),
              },
            ]
            : employeeData.jobDetails.jobStayAddress?.jobStayAddressHistory,
        },
      },
    };

    await updateEmployeeById(
      updatedData._id,
      updatedData,
      updateConfig.url,
      updateConfig.token,
    );

    const eventNotificationRequest: EventNotificationCreateRequest = createEventNotification(
      userId,
      "Zmiana adresu noclegu",
      `Dane adresu noclegu pracownika ${employeeData.personalData.firstName} ${employeeData.personalData.lastName} zostały zmienione`,
      "HR",
      user?.authId,
      ["hr", "hrmanager"],
    );

    addNewEventNotification(eventNotificationRequest);

    globalThis.location.href = `/hr/employee/${updatedData._id}`;
  };

  return (
    <>
      <EmployeeJobStayAddressForm
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
