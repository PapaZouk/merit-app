import {useState} from "preact/hooks";
import {createElement} from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import {Employee} from "../../../components/utils/api-client/types/Employee.ts";
import {updateEmployeeById} from "../../../components/utils/api-client/clients/employeeClient.ts";
import EmployeeAddress1Form from "../../../components/employee/forms/EmployeeAddress1Form.tsx";
import {MouseEventHandler} from "npm:@types/react@18.3.17/index.d.ts";
import ConfirmPopupEvent from "../../../components/popup/ConfirmPopupEvent.tsx";
import createEventNotification from "../../../components/utils/api-client/notifications/createEventNotification.ts";
import {useLogin} from "../../context/LoginProvider.tsx";
import {useNotifications} from "../../context/NotificationsProvider.tsx";
import {EventNotificationCreateRequest} from "../../../components/utils/api-client/types/EventNotification.ts";

type EmployeeUpdateAddress1Props = {
  employeeData: Employee;
  updateConfig: {
    url: string;
    token: string;
  };
};

export default function EmployeeUpdateAddress1({
  employeeData,
  updateConfig,
}: EmployeeUpdateAddress1Props) {
  const [formData, setFormData] = useState({
    street1: employeeData.personalData.address1.street1,
    house1: employeeData.personalData.address1.house1,
    city1: employeeData.personalData.address1.city1,
    zip1: employeeData.personalData.address1.zip1,
    state1: employeeData.personalData.address1.state1,
    voivodeship1: employeeData.personalData.address1.voivodeship1,
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

    const hasAddress1Changed =
      formData.street1 !== employeeData.personalData.address1.street1 ||
      formData.house1 !== employeeData.personalData.address1.house1 ||
      formData.city1 !== employeeData.personalData.address1.city1 ||
      formData.zip1 !== employeeData.personalData.address1.zip1 ||
      formData.state1 !== employeeData.personalData.address1.state1 ||
      formData.voivodeship1 !== employeeData.personalData.address1.voivodeship1;

    const updatedData: Employee = {
      _id: employeeData._id,
      personalData: {
        ...employeeData.personalData,
        address1: {
          street1: formData.street1,
          house1: formData.house1,
          city1: formData.city1,
          zip1: formData.zip1,
          state1: formData.state1,
          voivodeship1: formData.voivodeship1,
          address1History: hasAddress1Changed
            ? [
              ...employeeData.personalData.address1.address1History,
              {
                street1Before: employeeData.personalData.address1.street1,
                street1After: formData.street1,
                house1Before: employeeData.personalData.address1.house1,
                house1After: formData.house1,
                city1Before: employeeData.personalData.address1.city1,
                city1After: formData.city1,
                zip1Before: employeeData.personalData.address1.zip1,
                zip1After: formData.zip1,
                state1Before: employeeData.personalData.address1.state1,
                state1After: formData.state1,
                voivodeship1Before:
                  employeeData.personalData.address1.voivodeship1,
                voivodeship1After: formData.voivodeship1,
                changeDate: new Date().toISOString(),
              },
            ]
            : employeeData.personalData.address1.address1History,
        },
      },
      jobDetails: { ...employeeData.jobDetails },
    };

    await updateEmployeeById(
      updatedData._id,
      updatedData,
      updateConfig.url,
      updateConfig.token,
    );

    const eventNotificationRequest: EventNotificationCreateRequest = createEventNotification(
      userId,
      "Zmiana danych adresu zamieszkania",
      `Dane adresu zamieszkania pracownika ${employeeData.personalData.firstName} ${employeeData.personalData.lastName} zostały zmienione.`,
      "HR",
      user?.authId,
      ["hr", "hrmanager"],
    );

    addNewEventNotification(eventNotificationRequest);

    globalThis.location.href = `/hr/employee/${updatedData._id}`;
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
