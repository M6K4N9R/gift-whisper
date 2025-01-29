"use client";

import { SignupForm } from "../_components/forms/signup-form";

export default function SignupPage() {
  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <SignupForm />
    </section>
  );
}
