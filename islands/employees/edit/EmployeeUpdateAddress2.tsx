import {useEffect, useState} from "preact/hooks";
import {createElement} from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import {Employee} from "../../../components/utils/api-client/types/Employee.ts";
import EmployeeAddress2Form from "../../../components/employee/forms/EmployeeAddress2Form.tsx";
import {MouseEventHandler} from "npm:@types/react@18.3.17/index.d.ts";
import ConfirmPopupEvent from "../../../components/popup/ConfirmPopupEvent.tsx";
import createEventNotification from "../../../components/utils/api-client/notifications/createEventNotification.ts";
import {useLogin} from "../../../components/context/LoginProvider.tsx";
import {useNotifications} from "../../../components/context/NotificationsProvider.tsx";
import {emptyEmployeeData} from "../../../components/employee/utils/emptyEmployeeData.ts";

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

    const hasAddress2Changed =
      formData.street2 !== employeeData.personalData.address2.street2 ||
      formData.house2 !== employeeData.personalData.address2.house2 ||
      formData.city2 !== employeeData.personalData.address2.city2 ||
      formData.zip2 !== employeeData.personalData.address2.zip2 ||
      formData.state2 !== employeeData.personalData.address2.state2 ||
      formData.voivodeship2 !== employeeData.personalData.address2.voivodeship2;

    const updatedData: Employee = {
      _id: employeeData._id,
      personalData: {
        ...employeeData.personalData,
        address2: {
          street2: formData.street2,
          house2: formData.house2,
          city2: formData.city2,
          zip2: formData.zip2,
          state2: formData.state2,
          voivodeship2: formData.voivodeship2,
          address2History: hasAddress2Changed
            ? [
              ...employeeData.personalData.address2.address2History,
              {
                street2Before: employeeData.personalData?.address2?.street2,
                street2After: formData.street2,
                house2Before: employeeData.personalData?.address2?.house2,
                house2After: formData.house2,
                city2Before: employeeData.personalData?.address2?.city2,
                city2After: formData.city2,
                zip2Before: employeeData.personalData?.address2?.zip2,
                zip2After: formData.zip2,
                state2Before: employeeData.personalData?.address2?.state2,
                state2After: formData.state2,
                voivodeship2Before: employeeData.personalData?.address2
                  ?.voivodeship2,
                voivodeship2After: formData.voivodeship2,
                changeDate: new Date().toISOString(),
              },
            ]
            : employeeData.personalData.address2.address2History,
        },
      },
      jobDetails: { ...employeeData.jobDetails },
    };

    await fetch(`/api/employees/update/${updatedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })

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
