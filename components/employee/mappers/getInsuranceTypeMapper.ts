export function getInsuranceType(type: string) {
    switch (type.toLowerCase()) {
        case "a1":
            return "A1";
        case "commercial":
            return "Ubezpieczenie komercyjne";
        default:
            return "Brak";
    }
}