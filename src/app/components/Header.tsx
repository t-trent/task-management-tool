"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  // Optional: Listen to localStorage events if you expect changes from other tabs.
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setIsAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <header className="bg-blue-600 text-white py-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Task Manager</Link>
        </h1>
        <nav>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="px-3 hover:underline">
                Dashboard
              </Link>
              <Link href="/account-settings" className="px-3 hover:underline">
                Account Settings
              </Link>
              <button onClick={handleLogout} className="px-3 hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-3 hover:underline">
                Login
              </Link>
              <Link href="/register" className="px-3 hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
