import React from 'react';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map(task => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
};

export default TaskList;
