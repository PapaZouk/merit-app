export const getQueryParam = (url: URL, values: string): string => {
    url.searchParams.forEach((value, key) => {
        if (key === values) {
            return value;
        }
    });
    return "";
}