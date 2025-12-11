import { Task, Status } from '../types/task.types';

export function groupTasksByStatus(tasks: Task[]): Record<Status, Task[]> {
  return {
    backlog: tasks.filter(t => t.status === 'backlog'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    done: tasks.filter(t => t.status === 'done'),
  };
}

export function generateTaskId(): string {
  return crypto.randomUUID();
}

export function canDeleteTask(task: Task): boolean {
  return task.status !== 'in_progress';
}
