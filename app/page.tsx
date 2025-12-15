import { TasksPage } from './TasksPage';
import { getAllTasks } from '@/server/tasks/tasks-repository';

export default async function Home() {
  const initialTasks = getAllTasks();

  return <TasksPage initialTasks={initialTasks} />;
}
