type OtpFormProps = {
    handleChallenge: (event: Event) => void;
    code: string;
    setCode: (code: string) => void;
};

export default function OtpForm({ handleChallenge, code, setCode }: OtpFormProps) {
    return (
        <form onSubmit={handleChallenge} className="space-y-4">
            <label className="block">
                <span className="text-gray-700">Kod jednorazowy:</span>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode((e.target as HTMLInputElement).value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </label>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Zweryfikuj
            </button>
        </form>
    )
}