'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Input, Textarea, Select } from '@/shared/components/ui';
import { MultiSelect } from '@/shared/components/ui/MultiSelect/MultiSelect';
import { Task, UpdateTask, Status, Label } from '../types/task.types';

interface EditTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onUpdate: (id: string, data: UpdateTask) => void;
  onDelete: (id: string) => void;
}

export function EditTaskModal({
  isOpen,
  task,
  onClose,
  onUpdate,
  onDelete,
}: EditTaskModalProps) {
  const [formData, setFormData] = useState<UpdateTask>({});

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name,
        key: task.key,
        description: task.description,
        status: task.status,
        labels: task.labels,
      });
    }
  }, [task]);

  if (!task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(task.id, formData);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Task">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Task Name *"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <Input
          label="Task Key *"
          value={formData.key || ''}
          onChange={(e) => setFormData({ ...formData, key: e.target.value })}
          required
        />

        <Textarea
          label="Description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
        />

        <Select
          label="Status *"
          value={formData.status || 'backlog'}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
          options={[
            { value: 'backlog', label: 'Backlog' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'done', label: 'Done' },
          ]}
        />

        <MultiSelect
          label="Labels"
          selected={formData.labels || []}
          onChange={(labels) => setFormData({ ...formData, labels })}
        />

        <div className="flex justify-end items-center mt-2">

          <div className="flex gap-3">
            <Button type="button" variant="danger" onClick={handleDelete}>
              Delete Task
            </Button>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
