'use client';

import { Task } from '@/features/tasks/types/task.types';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const statusColors = {
    backlog: 'bg-[#F6F6F6] text-[#707070]',
    in_progress: 'bg-[#DAFFEF] text-[#707070]',
    done: 'bg-[#FCECD3] text-[#707070]',
  };

  return (
    <div
      className="bg-white rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-2">
        <span className={`text-[10px] rounded-[20px] font-medium px-1.5 py-1 ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-[#262626]">{task.name}</h3>
      <p className="text-xs font-medium text-[#A8A8A8] mb-3">{task.key}</p>
      <p className="text-xs text-[#262626B2] line-clamp-2 opacity-70 mb-4">{task.description}</p>
      <div className="h-0.5 bg-[#EEEEEE]"></div>
      <div className="flex flex-wrap gap-1 mt-4">
        {task.labels.map((label) => (
          <span
            key={label}
            className="inline-block px-2 py-1 text-xs font-semibold rounded bg-[#F6F6F6] text-[#707070]"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
