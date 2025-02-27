export const isWeekend = (year: number, month: number, day: number) => {
    const dayOfWeek = new Date(year, month - 1, day).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
};