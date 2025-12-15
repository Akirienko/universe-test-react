'use client';

import { Task } from '@/features/tasks/types/task.types';
import { TaskColumn } from './TaskColumn';
import { groupTasksByStatus } from '../utils/task-helpers';

interface TaskBoardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function TaskBoard({ tasks, onTaskClick }: TaskBoardProps) {
  const groupedTasks = groupTasksByStatus(tasks);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      <TaskColumn
        status="backlog"
        tasks={groupedTasks.backlog}
        onTaskClick={onTaskClick}
      />
      <TaskColumn
        status="in_progress"
        tasks={groupedTasks.in_progress}
        onTaskClick={onTaskClick}
      />
      <TaskColumn
        status="done"
        tasks={groupedTasks.done}
        onTaskClick={onTaskClick}
      />
    </div>
  );
}
