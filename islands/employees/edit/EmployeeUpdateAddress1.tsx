import {useEffect, useState} from "preact/hooks";
import {createElement} from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import {Employee} from "../../../components/utils/api-client/types/Employee.ts";
import EmployeeAddress1Form from "../../../components/employee/update/EmployeeAddress1Form.tsx";
import {MouseEventHandler} from "npm:@types/react@18.3.17/index.d.ts";
import ConfirmPopupEvent from "../../../components/popup/ConfirmPopupEvent.tsx";
import createEventNotification from "../../../components/utils/api-client/notifications/createEventNotification.ts";
import {useLogin} from "../../../components/context/LoginProvider.tsx";
import {useNotifications} from "../../../components/context/NotificationsProvider.tsx";
import {emptyEmployeeData} from "../../../components/employee/utils/emptyEmployeeData.ts";
import {isAddress1Changed} from "../../../components/employee/update/utils/isAddress1Changed.ts";
import {
  createEmployeeAddress1UpdateRequest,
} from "../../../components/employee/update/utils/factories/createEmployeeAddress1UpdateRequest.ts";
import {handleChangeFormData} from "../../../components/employee/update/utils/handlers/handleChangeFormData.tsx";
import {EmployeeEventTagsEnum,} from "../../../components/notifications/types/RoleTagsEnum.ts";

type EmployeeUpdateAddress1Props = {
  employeeId: string;
};

export default function EmployeeUpdateAddress1(
  { employeeId }: EmployeeUpdateAddress1Props,
) {
  const [employeeData, setEmployeeData] = useState<Employee>(emptyEmployeeData);
  const [formData, setFormData] = useState({
    street1: employeeData.personalData.address1.street1,
    house1: employeeData.personalData.address1.house1,
    city1: employeeData.personalData.address1.city1,
    zip1: employeeData.personalData.address1.zip1,
    state1: employeeData.personalData.address1.state1,
    voivodeship1: employeeData.personalData.address1.voivodeship1,
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
        street1: responseBody.result.personalData.address1.street1,
        house1: responseBody.result.personalData.address1.house1,
        city1: responseBody.result.personalData.address1.city1,
        zip1: responseBody.result.personalData.address1.zip1,
        state1: responseBody.result.personalData.address1.state1,
        voivodeship1: responseBody.result.personalData.address1.voivodeship1,
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

    const hasAddress1Changed = isAddress1Changed(formData, employeeData);

    if (!hasAddress1Changed) {
      throw new Error("Address1 has not changed");
    }

    const updatedData: Employee = createEmployeeAddress1UpdateRequest(
      formData,
      employeeData,
      hasAddress1Changed,
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
      "Zmiana danych adresu zamieszkania",
      `Dane adresu zamieszkania pracownika ${employeeData.personalData.firstName} ${employeeData.personalData.lastName} zostały zmienione.`,
      "HR",
      [EmployeeEventTagsEnum.UPDATED],
    ));

    globalThis.location.href = `/hr/employee/${employeeId}`;
  };

  return (
    <>
      <EmployeeAddress1Form
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
