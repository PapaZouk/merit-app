import moment from "npm:moment";

export const calculateDayBalance = (checkIn: string, checkOut: string): number => {
  const workingMinutes = 8 * 60;
  const checkOutTime = moment(checkOut, 'HH:mm');
  const checkInTime = moment(checkIn, 'HH:mm');

  if (checkInTime.isAfter(checkOutTime)) {
    return -480;
  }

  if (checkOutTime.isSame(checkInTime)) {
    return 0;
  }

  const checkOutToCheckInMinutes = checkOutTime.diff(checkInTime, 'minutes');

  return checkOutToCheckInMinutes - workingMinutes;
};
