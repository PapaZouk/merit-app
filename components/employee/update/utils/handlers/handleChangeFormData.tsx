import { h } from 'preact';

export const handleChangeFormData = (
    e: h.JSX.TargetedEvent<HTMLInputElement | HTMLSelectElement, Event>,
    setFormData: (data: any) => void
) => {
  const target = e.target as HTMLInputElement | HTMLSelectElement;
  const { name, value } = target;
  setFormData((prevData: any) => ({
    ...prevData,
    [name]: value,
  }));
}