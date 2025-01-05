export function getFormattedDate(date: Date): string {
    return date.toISOString().split('T')[0];
}