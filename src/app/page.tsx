"use client";

import Header from "./_components/header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="font-gelica text-5xl text-white text-center mx-auto">
            Create your Gift list <br />
            for any occasion
          </h1>
          <h2 className="text-md text-white text-center mx-auto">
            Add gifts from any website and share it with anyone.
          </h2>
          <div className="w-full md:w-2/4 p-3"></div>
          <button className="px-4 py-2 rounded-3xl border hover:border-orange-600 hover:bg-slate-900 transition-all ease-in-out">
            <svg
              className="inline-block mr-3"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
            Create a list
          </button>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <code className="bg-secondary-900 text-white px-4 py-2 rounded-3xl">
            ...in development
          </code>
        </footer>
      </div>
    </>
  );
}
