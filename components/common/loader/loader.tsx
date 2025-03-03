export default function Loader() {
    return (
        <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div class="flex flex-col items-center">
                <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 md:h-32 md:w-32 mb-4"></div>
                <h2 class="text-center text-gray-700 text-lg md:text-xl font-semibold">Ładowanie...</h2>
            </div>
        </div>
    );
}