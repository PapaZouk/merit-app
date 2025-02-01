
export const validateQueryParams = (url: URL, validParams: string[]): boolean => {
    const queryParams: URLSearchParams = url.searchParams;
    for (const key in queryParams) {
        if (!validParams.includes(key)) {
            return false;
        }
    }

    return true;
}