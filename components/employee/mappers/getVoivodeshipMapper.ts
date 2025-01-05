export function getVoivodeshipMapper(value: string|null|undefined): string {
    switch (value) {
        case "DS": return "Dolnośląskie";
        case "KP": return "Kujawsko-Pomorskie";
        case "LU": return "Lubelskie";
        case "LB": return "Lubuskie";
        case "LD": return "Łódzkie";
        case "MA": return "Małopolskie";
        case "MZ": return "Mazowieckie";
        case "OP": return "Opolskie";
        case "PK": return "Podkarpackie";
        case "PD": return "Podlaskie";
        case "PM": return "Pomorskie";
        case "SL": return "Śląskie";
        case "SW": return "Świętokrzyskie";
        case "WM": return "Warmińsko-Mazurskie";
        case "WP": return "Wielkopolskie";
        case "ZP": return "Zachodniopomorskie";
        default: return "Brak danych";
    }
}