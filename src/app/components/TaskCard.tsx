import React from 'react';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  status: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, description, status }) => {
  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2">{description}</p>
      <span className="block mt-4 text-sm text-gray-600">Status: {status}</span>
    </div>
  );
};

export default TaskCard;
