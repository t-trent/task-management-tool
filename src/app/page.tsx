import TaskList from './components/TaskList';

// Example sample tasks
const sampleTasks = [
  { id: '1', title: 'Design UI', description: 'Create wireframes for the dashboard', status: 'In Progress' },
  { id: '2', title: 'Set up API', description: 'Establish endpoints for task management', status: 'Pending' },
];

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Task Manager</h1>
      <TaskList tasks={sampleTasks} />
    </div>
  );
}
