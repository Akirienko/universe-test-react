'use client';

import { useState } from 'react';
import { Modal, Button, Input, Textarea, Select } from '@/shared/components/ui';
import { MultiSelect } from '@/shared/components/ui/MultiSelect/MultiSelect';
import { CreateTask, Status } from '../types/task.types';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTask) => void;
}

export function CreateTaskModal({ isOpen, onClose, onSubmit }: CreateTaskModalProps) {
  const [formData, setFormData] = useState<CreateTask>({
    name: '',
    key: '',
    description: '',
    status: 'backlog',
    labels: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      key: '',
      description: '',
      status: 'backlog',
      labels: [],
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Task Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="Enter task name"
        />

        <Input
          label="Task Key *"
          value={formData.key}
          onChange={(e) => setFormData({ ...formData, key: e.target.value })}
          required
          placeholder="e.g. TASK-001"
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter task description"
          rows={4}
        />

        <Select
          label="Status *"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
          options={[
            { value: 'backlog', label: 'Backlog' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'done', label: 'Done' },
          ]}
        />

        <MultiSelect
          label="Labels"
          selected={formData.labels}
          onChange={(labels) => setFormData({ ...formData, labels })}
        />

        <div className="flex justify-end gap-3 mt-2">
          <Button type="submit" variant="primary">
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
