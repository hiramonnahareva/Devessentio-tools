"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const gradientColors = ["#4F46E5", "#F43F5E", "#10B981", "#F59E0B"];
  const gradient = `linear-gradient(135deg, ${gradientColors.join(",")})`;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white p-6"
      style={{ background: gradient }}
    >
      <h1 className="text-7xl font-extrabold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! Page not found.</p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        Go Home
      </button>
    </div>
  );
}