import { Task } from '@/features/tasks/types/task.types';
import { mockTasks } from './mock-data';

const tasksMap = new Map<string, Task>(
  mockTasks.map((task) => [task.id, task])
);

export function getAllTasks(): Task[] {
  return Array.from(tasksMap.values());
}

export function getTaskById(id: string): Task | undefined {
  return tasksMap.get(id);
}

export function createTask(task: Task): Task {
  tasksMap.set(task.id, task);
  return task;
}

export function updateTask(id: string, updates: Partial<Task>): Task | null {
  const task = tasksMap.get(id);
  if (!task) return null;

  const updatedTask = { ...task, ...updates };
  tasksMap.set(id, updatedTask);
  return updatedTask;
}

export function deleteTask(id: string): boolean {
  return tasksMap.delete(id);
}