import Layout from '../components/Layout';
import TaskList from '../components/TaskList';

const dummyTasks = [
  { id: '1', title: 'Buy Groceries', description: 'Milk, Eggs, Bread, etc.', status: 'Pending' },
  { id: '2', title: 'Workout', description: 'Gym session at 6 PM', status: 'Completed' },
  { id: '3', title: 'Team Meeting', description: 'Discuss project updates', status: 'In Progress' },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <TaskList tasks={dummyTasks} />
    </div>
  );
}
