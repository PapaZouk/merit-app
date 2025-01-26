import {useEffect, useState} from "preact/hooks";
import {createElement} from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import {Employee} from "../../../components/utils/api-client/types/Employee.ts";
import {MouseEventHandler} from "npm:@types/react@18.3.17/index.d.ts";
import ConfirmPopupEvent from "../../../components/popup/ConfirmPopupEvent.tsx";
import EmployeeJobStayAddressForm from "../../../components/employee/forms/EmployeeJobStayAddressForm.tsx";
import {EventNotificationCreateRequest} from "../../../components/utils/api-client/types/EventNotification.ts";
import createEventNotification from "../../../components/utils/api-client/notifications/createEventNotification.ts";
import {useLogin} from "../../../components/context/LoginProvider.tsx";
import {useNotifications} from "../../../components/context/NotificationsProvider.tsx";
import {emptyEmployeeData} from "../../../components/employee/utils/emptyEmployeeData.ts";

type EmployeeUpdateJobStayAddressProps = {
  employeeId: string;
};

export default function EmployeeUpdateJobStayAddress(
  { employeeId }: EmployeeUpdateJobStayAddressProps,
) {
  const [employeeData, setEmployeeData] = useState<Employee>(emptyEmployeeData);
  const [formData, setFormData] = useState({
    jobStayAddressStreet: employeeData.jobDetails.jobStayAddress?.street ?? "Brak danych",
    jobStayAddressHouse: employeeData.jobDetails.jobStayAddress?.house ?? "Brak danych",
    jobStayAddressCity: employeeData.jobDetails.jobStayAddress?.city ?? "Brak danych",
    jobStayAddressZip: employeeData.jobDetails.jobStayAddress?.zip ?? "Brak danych",
    jobStayAddressState: employeeData.jobDetails.jobStayAddress?.state ?? "Brak danych",
    jobStayAddressVoivodeship: employeeData.jobDetails.jobStayAddress?.voivodeship ?? "Brak danych",
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
        jobStayAddressStreet: responseBody.result.jobDetails.jobStayAddress.street,
        jobStayAddressHouse: responseBody.result.jobDetails.jobStayAddress.house,
        jobStayAddressCity: responseBody.result.jobDetails.jobStayAddress.city,
        jobStayAddressZip: responseBody.result.jobDetails.jobStayAddress.zip,
        jobStayAddressState: responseBody.result.jobDetails.jobStayAddress.state,
        jobStayAddressVoivodeship: responseBody.result.jobDetails.jobStayAddress.voivodeship,
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

    const hasJobStayAddressChanged = formData.jobStayAddressStreet !==
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

    await fetch(`/api/employees/update/${updatedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const eventNotificationRequest: EventNotificationCreateRequest =
      createEventNotification(
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
