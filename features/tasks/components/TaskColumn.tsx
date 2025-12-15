'use client';

import { Task, Status, STATUS_LABELS } from '@/features/tasks/types/task.types';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  status: Status;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function TaskColumn({ status, tasks, onTaskClick }: TaskColumnProps) {
  return (
    <div className="flex flex-col bg-[#F6F6F8] rounded-3xl p-4 min-w-[320px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#262626]">{STATUS_LABELS[status]}</h2>
      </div>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
        ))}
      </div>
    </div>
  );
}
