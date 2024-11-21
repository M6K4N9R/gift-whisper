"use client";

import Header from "./_components/header/Header";
import { useState } from "react";

export default function Home() {
const [currentStep, setCurrentStep] = useState(0);
const [isAnimating, setIsAnimating] = useState(false);

const content = [
  {title: "Create your Gift list for any occasion", subtitle: "Add gifts from any website and share it with anyone"},
  {page1Title: "Create a Wishlist", page1Description: "Wishlists can be for yourself, for a friend, or even a pet!", backButton: true},
  {page2Title: "Add Wishes", page2Description: "Paste a link from any website. We'll load in the details.", backButton: true},
  {page3Title: "Share & Claim", page3Description: "Friends claim your wishes anonymously. Be Surprised.", backButton: true},
];

const handleLearnMore = () => {
  setIsAnimating(true);
  setTimeout(() => {
    setCurrentStep(1);
    setIsAnimating(false);
  }, 300);
};

const handleNext = () => {
  setIsAnimating(true);
  setTimeout(() => {
    setCurrentStep(prev => prev + 1);
    setIsAnimating(false);
  }, 300);
};

const handleBackButton = () => {
  setIsAnimating(true);
  setTimeout(() => {
    setCurrentStep(prev => prev - 1);
    setIsAnimating(false);
  }, 300);
}


  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen my-auto p-4">
        <div className="flex-grow flex flex-col justify-center items-center">
          <h1 className="font-gelica text-3xl md:text-5xl text-white text-center mx-auto">
            Create your Gift list <br />
            for any occasion
          </h1>
          <h2 className="text-sm md:text-base text-white text-center mx-auto mt-5">
            Add gifts from any website and share it with anyone
          </h2>
        </div>
        <div className="flex justify-center gap-3 mt-4">
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
            Create list
          </button>
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
            Learn more
          </button>
        </div>
      </div>
      {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
      </div> */}
    </>
  );
}
