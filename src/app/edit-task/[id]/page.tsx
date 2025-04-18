"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
}

export default function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch(`/api/tasks/${id}`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch task");
        }
        const data = await res.json();
        setTask(data.task);
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Failed to load task");
      } finally {
        setLoading(false);
      }
    }
    fetchTask();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: task?.title,
          description: task?.description,
          status: task?.status,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Update failed");
      }
      // On success, redirect to the dashboard.
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error updating task:", err);
      setError("Failed to update task");
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading task...</div>;
  }

  if (error || !task) {
    return (
      <div className="container mx-auto p-4 text-red-500">
        {error || "Task not found"}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">
            Description:
          </label>
          <textarea
            id="description"
            value={task.description}
            onChange={(e) =>
              setTask({ ...task, description: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block mb-1">
            Status:
          </label>
          <select
            id="status"
            value={task.status}
            onChange={(e) =>
              setTask({ ...task, status: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In-progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}
