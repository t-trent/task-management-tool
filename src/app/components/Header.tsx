"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check token in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setIsAuthChecked(true);

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
    <header className="bg-blue-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <Link href="/">Task Manager</Link>
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {isAuthChecked &&
            (isAuthenticated ? (
              <>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <Link href="/account-settings" className="hover:underline">
                  Account Settings
                </Link>
                <button onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
                <Link href="/register" className="hover:underline">
                  Sign Up
                </Link>
              </>
            ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-blue-600">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            {isAuthChecked &&
              (isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:underline"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/account-settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:underline"
                  >
                    Account Settings
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-left hover:underline"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:underline"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:underline"
                  >
                    Sign Up
                  </Link>
                </>
              ))}
          </div>
        </nav>
      )}
    </header>
  );
}
