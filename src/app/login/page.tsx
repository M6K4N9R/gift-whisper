"use client";
import { Suspense } from "react";
import LoginForm from "../_components/forms/loginForm";

export default function LoginPage() {
  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
}
