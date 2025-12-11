import { get, post, put, del } from '@/shared/lib/api-client';
import { Task, CreateTask, UpdateTask } from '../types/task.types';
import { ENDPOINTS } from '@/shared/lib/constants';

export async function fetchTasks(): Promise<Task[]> {
  return get<Task[]>(ENDPOINTS.TASKS);
}

export async function createTask(data: CreateTask): Promise<Task> {
  return post<Task>(ENDPOINTS.TASKS, data);
}

export async function updateTask(
  id: string,
  data: UpdateTask
): Promise<Task> {
  return put<Task>(`${ENDPOINTS.TASKS}/${id}`, data);
}

export async function deleteTask(id: string): Promise<{ success: boolean }> {
  return del<{ success: boolean }>(`${ENDPOINTS.TASKS}/${id}`);
}
