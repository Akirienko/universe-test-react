import { NextRequest, NextResponse } from 'next/server';
import {
  getTaskById,
  updateTask,
  deleteTask,
} from '@/server/tasks/tasks-repository';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    const updated = updateTask(id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const task = getTaskById(id);

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  // ⚠️ Перевірка статусу (вимога завдання!)
  if (task.status === 'in_progress') {
    return NextResponse.json(
      { error: 'Cannot delete task in progress' },
      { status: 409 } // Conflict
    );
  }

  deleteTask(id);
  return NextResponse.json({ success: true });
}
