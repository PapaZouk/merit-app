export const formatBankAccount = (account: string) => {
    return account.replace(/(.{4})/g, "$1 ");
};