import { Head } from "$fresh/runtime.ts";

export default function Error403() {
  return (
    <>
      <Head>
        <title>403 - Forbidden</title>
      </Head>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <img
            class="my-6 mx-auto"
            src="/images/logo_256x256.png"
            width="128"
            height="128"
            alt="logo aplikacji MERIT"
          />
          <h1 class="text-4xl font-bold mb-4">403 - Forbidden</h1>
          <p class="mb-4">Nie masz uprawnień do przeglądania tego adresu</p>
          <a href="/" class="underline text-indigo-500">
            Wróc do strony głównej
          </a>
        </div>
      </div>
    </>
  );
}
