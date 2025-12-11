export type Status = 'backlog' | 'in_progress' | 'done';

export type Label = 'frontend' | 'backend' | 'bug' | 'feature' | 'urgent';

export interface Task {
  id: string;
  name: string;
  key: string;
  description: string;
  status: Status;
  labels: Label[];
}

export interface CreateTask {
  name: string;
  key: string;
  description: string;
  status: Status;
  labels: Label[];
}

export interface UpdateTask {
  name?: string;
  key?: string;
  description?: string;
  status?: Status;
  labels?: Label[];
}

export const STATUS_LABELS: Record<Status, string> = {
  backlog: 'Backlog',
  in_progress: 'In Progress',
  done: 'Done',
};

export const LABEL_OPTIONS: { value: Label; label: string }[] = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'Feature' },
  { value: 'urgent', label: 'Urgent' },
];


