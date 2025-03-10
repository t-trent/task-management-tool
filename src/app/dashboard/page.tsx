"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TaskList from "../components/TaskList";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // Fetch tasks from the API using credentials
  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks", {
        credentials: "include",
      });

      let data;
      try {
        data = await res.json();
      } catch (e) {
        data = { tasks: [] };
      }

      if (res.ok) {
        setTasks(data.tasks || []);
      } else {
        if (data.error === "Token expired, please log in again") {
          router.push("/login");
          return;
        }
        throw new Error(data.error || "Failed to fetch tasks");
      }
    } catch (err: any) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [router]);

  // Callback to update a task's status using credentials: "include"
  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update task");
      }
      // Re-fetch tasks after updating
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Callback to delete a task using credentials: "include"
  const deleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete task");
      }
      // Re-fetch tasks after deletion
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Group tasks by status
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">Dashboard</h1>
          <Link href="/create-task">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300">
              Add Task
            </button>
          </Link>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Pending Tasks */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Pending
          </h2>
          {pendingTasks.length === 0 ? (
            <p className="text-gray-500">No pending tasks.</p>
          ) : (
            <TaskList
              tasks={pendingTasks}
              onStatusChange={updateTaskStatus}
              onDelete={deleteTask}
            />
          )}
        </section>

        {/* In-progress Tasks */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
            In-Progress
          </h2>
          {inProgressTasks.length === 0 ? (
            <p className="text-gray-500">No In-Progress tasks.</p>
          ) : (
            <TaskList
              tasks={inProgressTasks}
              onStatusChange={updateTaskStatus}
              onDelete={deleteTask}
            />
          )}
        </section>

        {/* Completed Tasks */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Completed
          </h2>
          {completedTasks.length === 0 ? (
            <p className="text-gray-500">No completed tasks.</p>
          ) : (
            <TaskList
              tasks={completedTasks}
              onStatusChange={updateTaskStatus}
              onDelete={deleteTask}
            />
          )}
        </section>
      </div>
    </div>
  );
}
