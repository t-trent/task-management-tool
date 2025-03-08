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
    <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-[1.001] hover:shadow-xl">
      <div className="flex flex-col space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <select
              value={status}
              onChange={handleStatusChange}
              className="p-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </select>
            <Link href={`/edit-task/${id}`}>
              <button className="bg-green-600 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow transition">
                Edit
              </button>
            </Link>
            <button
              onClick={() => onDelete(id)}
              className="bg-red-900 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition"
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
