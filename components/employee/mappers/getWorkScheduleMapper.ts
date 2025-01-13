export function getWorkSchedule(schedule: string) {
    switch (schedule.toLowerCase()) {
        case "full-time":
            return "Pełny etat";
        case "part-time":
            return "Niepełny etat";
        case "remote":
            return "Praca zdalna";
        case "business-trips":
            return "Delegacje";
        default:
            return "Brak";
    }
}