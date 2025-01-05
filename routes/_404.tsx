import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Strona nie znaleziona</title>
      </Head>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <img
            class="my-6 mx-auto"
            src="/images/logo_256x256.png"
            width="128"
            height="128"
            alt="logo Fresh: pokrojona cytryna ociekająca sokiem"
          />
          <h1 class="text-4xl font-bold mb-4">404 - Strona nie znaleziona</h1>
          <p class="mb-4">Strona, której szukasz, nie istnieje.</p>
          <a href="/" class="underline text-indigo-500">Wróć do strony głównej</a>
        </div>
      </div>
    </>
  );
}