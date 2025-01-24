export function calculateWorkedTime(checkIn: string, checkOut: string): string {
    const parseTime = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const checkInMinutes = parseTime(checkIn);
    const checkOutMinutes = parseTime(checkOut);

    const totalWorkedMinutes = checkOutMinutes - checkInMinutes;

    const hours = Math.floor(totalWorkedMinutes / 60);
    const minutes = totalWorkedMinutes % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours}.${formattedMinutes}`;
}
