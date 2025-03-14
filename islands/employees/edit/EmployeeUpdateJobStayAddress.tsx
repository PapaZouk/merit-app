import { useEffect, useState } from "preact/hooks";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { Employee } from "../../../components/utils/api-client/types/Employee.ts";
import { MouseEventHandler } from "npm:@types/react@18.3.17/index.d.ts";
import ConfirmEventPopup from "../../../components/common/popup/custom/ConfirmEventPopup.tsx";
import EmployeeJobStayAddressForm from "../../../components/employee/update/EmployeeJobStayAddressForm.tsx";
import { EventNotificationCreateRequest } from "../../../components/utils/api-client/types/EventNotification.ts";
import createEventNotification from "../../../components/utils/api-client/notifications/createEventNotification.ts";
import { useLogin } from "../../../components/context/LoginProvider.tsx";
import { useNotifications } from "../../../components/context/NotificationsProvider.tsx";
import { emptyEmployeeData } from "../../../components/employee/utils/emptyEmployeeData.ts";
import { isJobStayAddressChanged } from "../../../components/employee/update/utils/isJobStayAddressChanged.ts";
import {
  createEmployeeJobStayAddressUpdateRequest,
} from "../../../components/employee/update/utils/factories/createEmployeeJobStayAddressUpdateRequest.ts";
import { handleChangeFormData } from "../../../components/employee/update/utils/handlers/handleChangeFormData.tsx";
import { EmployeeEventTagsEnum } from "../../../components/notifications/types/RoleTagsEnum.ts";

type EmployeeUpdateJobStayAddressProps = {
  employeeId: string;
};

export default function EmployeeUpdateJobStayAddress(
  { employeeId }: EmployeeUpdateJobStayAddressProps,
) {
  const [employeeData, setEmployeeData] = useState<Employee>(emptyEmployeeData);
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
  const { userId } = useLogin();
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
        jobStayAddressStreet:
          responseBody.result.jobDetails.jobStayAddress.street,
        jobStayAddressHouse:
          responseBody.result.jobDetails.jobStayAddress.house,
        jobStayAddressCity: responseBody.result.jobDetails.jobStayAddress.city,
        jobStayAddressZip: responseBody.result.jobDetails.jobStayAddress.zip,
        jobStayAddressState:
          responseBody.result.jobDetails.jobStayAddress.state,
        jobStayAddressVoivodeship:
          responseBody.result.jobDetails.jobStayAddress.voivodeship,
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
    handleChangeFormData(e, setFormData);
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

    const hasJobStayAddressChanged = isJobStayAddressChanged(
      formData,
      employeeData,
    );

    const updatedData: Employee = createEmployeeJobStayAddressUpdateRequest(
      formData,
      employeeData,
      hasJobStayAddressChanged,
    );

    await fetch(`/api/employees/update/${updatedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    addNewEventNotification(createEventNotification(
      userId,
      "Zmiana adresu noclegu",
      `Dane adresu noclegu pracownika ${employeeData.personalData.firstName} ${employeeData.personalData.lastName} zostały zmienione`,
      "HR",
      [EmployeeEventTagsEnum.UPDATED],
    ));

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
        <ConfirmEventPopup
          title={"Czy na pewno chcesz zapisać zmiany?"}
          onConfirm={confirmSubmit}
          onCancel={handlePopup}
        />
      )}
    </>
  );
}
