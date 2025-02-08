import React from 'react';
import Link from 'next/link';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  status: string;
  onStatusChange: (taskId: string, newStatus: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  status,
  onStatusChange,
  onDelete,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(id, e.target.value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 capitalize">
            Status: {status}
          </span>
          <div className="flex items-center space-x-2">
            <select
              value={status}
              onChange={handleStatusChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </select>
            <Link href={`/edit-task/${id}`}>
              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg shadow-md transition">
                Edit
              </button>
            </Link>
            <button
              onClick={() => onDelete(id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg shadow-md transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
