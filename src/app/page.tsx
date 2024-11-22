"use client";

import Header from "./_components/header/Header";
import { useState } from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const content = [
    {
      title: "Create your Gift list for any occasion",
      explanation: "Add gifts from any website and share it with anyone",
    },
    {
      title: "Create a Wishlist",
      explanation:
        "Wishlists can be for yourself, for a friend, or even a pet!",
      backButton: true,
    },
    {
      title: "Add Wishes",
      explanation: "Paste a link from any website. We'll load in the details.",
      backButton: true,
    },
    {
      title: "Share & Claim",
      explanation: "Friends claim your wishes anonymously. Be Surprised.",
      backButton: true,
    },
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
      setCurrentStep((prev) => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleBackButton = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <>
      <Header />
      <div
        className={`flex-grow flex flex-col justify-center max-w-96 mx-2 md:mx-auto min-h-80 items-center transition-all duration200 ${
          isAnimating
            ? "opacity-0 transform -translate-x-full"
            : "opacity-100 transform translate-x-0"
        }`}
      >
        {currentStep === 0 ? (
          <>
            <h1 className="font-gelica text-4xl sm:text-5xl text-white text-center">
              {content[currentStep].title}
            </h1>
            <h2 className="mt-6 mx-4 text-center">
              {content[currentStep].explanation}
            </h2>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center rounded-lg mx-4 p-4 border border-dark-accent-600">
              <h2 className="font-gelica text-xl text-white text-center">
                {content[currentStep].title}
              </h2>
              <p className="mt-6 mx-4 text-center">
                {content[currentStep].explanation}
              </p>
              {content[currentStep].backButton && (
                <button
                  onClick={handleBackButton}
                  className="mt-4 font-medium self-end"
                >
                  <span>&#8592;</span> Back
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex justify-center items-center gap-4">
        <button className="inline-flex items-center justify-center min-w-32 px-4 py-2 rounded-3xl font-medium border border-primary-900 hover:border-white bg-primary-900 hover:bg-white text-white hover:text-background transition-all ease-in-out">
          Create a list
        </button>
        <button
          onClick={currentStep === 0 ? handleLearnMore : handleNext}
          className={`${
            currentStep === content.length - 1
              ? `hidden`
              : `inline-flex items-center justify-center min-w-32 px-4 py-2 rounded-3xl font-medium border border-primary-900 hover:border-white bg-background text-primary-900 hover:text-white transition-all ease-in-out`
          }`}
        >
          {currentStep === 0 ? "Learn More" : "Next"}
        </button>
      </div>

      
    </>
  );
}
