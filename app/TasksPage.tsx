'use client';

import { useEffect, useState } from 'react';
import { Task, CreateTask, UpdateTask } from '@/features/tasks/types/task.types';
import { useTasksStore } from '@/features/tasks/store/tasks-store';
import { useToastStore } from '@/shared/components/toast/toast-store';
import { TaskBoard } from '@/features/tasks/components/TaskBoard';
import { CreateTaskModal } from '@/features/tasks/components/CreateTaskModal';
import { EditTaskModal } from '@/features/tasks/components/EditTaskModal';
import { Button } from '@/shared/components/ui';
import * as tasksApi from '@/features/tasks/api/tasks-api';

interface TasksPageProps {
  initialTasks: Task[];
}

export function TasksPage({ initialTasks }: TasksPageProps) {
  const { tasks, setTasks, addTask, updateTask, removeTask } = useTasksStore();
  const addToast = useToastStore((state) => state.addToast);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks, setTasks]);

  const handleCreate = async (data: CreateTask) => {
    try {
      const newTask = await tasksApi.createTask(data);
      addTask(newTask);
      setIsCreateModalOpen(false);
      addToast({
        type: 'success',
        message: 'Task created successfully!',
      });
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Failed to create task',
      });
    }
  };

  const handleUpdate = async (id: string, data: UpdateTask) => {
    try {
      const updated = await tasksApi.updateTask(id, data);
      updateTask(id, updated);
      setEditingTask(null);
      addToast({
        type: 'success',
        message: 'Task updated successfully!',
      });
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Failed to update task',
      });
    }
  };

  const handleDelete = async (id: string) => {

    try {
      await tasksApi.deleteTask(id);
      removeTask(id);
      setEditingTask(null);
      addToast({
        type: 'success',
        message: 'Task deleted successfully!',
      });
    } catch (error: any) {
      addToast({
        type: 'error',
        message: error.message || 'Failed to delete task',
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white px-6 py-4">
        <div className="flex justify-end max-w-7xl mx-auto">
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create Task
          </Button>
        </div>
      </header>

      <main className="px-6 py-6 max-w-7xl mx-auto">
        <TaskBoard tasks={tasks} onTaskClick={setEditingTask} />
      </main>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
      />

      <EditTaskModal
        isOpen={!!editingTask}
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
