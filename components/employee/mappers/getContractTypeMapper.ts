export function getContractType(contract: string) {
    switch (contract.toLowerCase()) {
        case "b2b":
            return "Umowa B2B";
        case "uop":
            return "Umowa o Pracę";
        case "mandate":
            return "Umowa Zlecenie";
        case "specific-task":
            return "Umowa o dzieło";
        case "temporary":
            return "Umowa na Czas Określony";
        case "internship":
            return "Staż";
        case "part-time":
            return "Umowa na Część Etatu";
        default:
            return "Brak";
    }
}