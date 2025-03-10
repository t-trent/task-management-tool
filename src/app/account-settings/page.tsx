"use client";

import { useEffect, useState } from "react";

interface UserData {
  email: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
}

export default function AccountSettings() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        // Convert birthday to YYYY-MM-DD if present
        let birthdayStr = "";
        if (data.user?.birthday) {
          birthdayStr = new Date(data.user.birthday).toISOString().split("T")[0];
        }
        setUserData({
          email: data.user.email,
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          birthday: birthdayStr,
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to load user data.");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          birthday: userData?.birthday,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Account updated successfully!");
      } else {
        setError(data.error || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("An unexpected error occurred.");
    }
  };

  if (loading) {
    return <div className="max-w-md mx-auto p-4">Loading...</div>;
  }

  if (error || !userData) {
    return (
      <div className="max-w-md mx-auto p-4 text-red-500">
        {error || "No user data available."}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Account Settings</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="birthday">
            Birthday
          </label>
          <input
            id="birthday"
            type="date"
            value={userData.birthday}
            onChange={(e) =>
              setUserData({ ...userData, birthday: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Update Settings
        </button>
      </form>
    </div>
  );
}
