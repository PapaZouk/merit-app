export function mapAppwriteErrorMessage(code: number): string {
    switch (code) {
        case 401:
            return "Nieprawidłowe dane logowania";
        case 429:
            return "Przekroczono limit prób logowania. Wróć ponownie później";
        default:
            return "Wystąpił błąd podczas logowania";
    }
}