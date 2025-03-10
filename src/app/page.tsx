"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/validate", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          setIsAuthenticated(true);
          router.push("/dashboard");
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setIsAuthChecked(true);
      }
    }
    checkAuth();
  }, [router]);

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If not authenticated, show the landing page content.
  return (
    <div>
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <section className="text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome to Task Manager
          </h1>
          <p className="text-xl mb-8 text-gray-700">
            Stay organized, track your progress, and boost your productivity
            with our task management app.
          </p>
          <a
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
          >
            Get Started
          </a>
        </section>
        {/* Features Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Easy Task Management</h3>
            <p className="text-gray-600">
              Quickly create, update, and delete tasks.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Organize by Status</h3>
            <p className="text-gray-600">
              Group your tasks by status to keep your workflow clear.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Account Support</h3>
            <p className="text-gray-600">
              Access your tasks from anywhere by creating an account and logging in.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
