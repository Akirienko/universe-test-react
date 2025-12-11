import { NextRequest, NextResponse } from 'next/server';
import { getAllTasks, createTask } from '@/server/tasks/tasks-repository';
import { generateTaskId } from '@/features/tasks/utils/task-helpers';

export async function GET() {
  const tasks = getAllTasks();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newTask = {
      id: generateTaskId(),
      ...body,
    };

    const created = createTask(newTask);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}