# Task Manager

Jira-style task management system built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ **SSR (Server-Side Rendering)** - Initial data loading on the server
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete tasks
- ✅ **Global State Management** - Zustand for client-side state
- ✅ **Toast Notifications** - Success/error notifications for all operations
- ✅ **Three Status Columns** - Backlog, In Progress, Done
- ✅ **Task Labels** - Multiple labels per task with custom multi-select
- ✅ **Delete Protection** - Cannot delete tasks with "In Progress" status
- ✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **UI Components**: [Headless UI](https://headlessui.com/)
- **Utilities**: clsx, tailwind-merge

## Project Structure

```
universe-test-react/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── tasks/
│   │       ├── route.ts          # GET, POST /api/tasks
│   │       └── [id]/route.ts     # PUT, DELETE /api/tasks/:id
│   ├── TasksPage.tsx             # Main client component
│   ├── page.tsx                  # SSR wrapper
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── features/                     # Feature-first architecture
│   └── tasks/
│       ├── api/                  # Client-side API functions
│       ├── components/           # Task-related components
│       ├── store/                # Zustand store
│       ├── types/                # TypeScript types
│       └── utils/                # Helper functions
│
├── shared/                       # Shared code
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   └── toast/                # Toast notifications
│   ├── lib/                      # Utilities
│   └── types/                    # Shared types
│
└── server/                       # Server-side code
    └── tasks/
        ├── mock-data.ts          # Initial mock data
        └── tasks-repository.ts   # In-memory storage
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Akirienko/universe-test-react.git
cd universe-test-react
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture Decisions

### Feature-First Structure
Organized by features rather than technical layers for better scalability and maintainability.

### Functional Approach
Used functional programming patterns instead of classes for simpler, more testable code.

### In-Memory Storage
Tasks are stored in a Map on the server. Data persists during the session but resets on server restart.

### Pure Tailwind CSS
No UI component libraries (like shadcn/ui) - all components built with Tailwind utilities for full control.

### Zustand for State
Lightweight state management with simple API and good TypeScript support.

## API Endpoints

### `GET /api/tasks`
Fetch all tasks.

**Response:** `Task[]`

### `POST /api/tasks`
Create a new task.

**Body:** `CreateTask`
**Response:** `Task`

### `PUT /api/tasks/:id`
Update an existing task.

**Body:** `UpdateTask`
**Response:** `Task`

### `DELETE /api/tasks/:id`
Delete a task.

**Business Rule:** Cannot delete tasks with status "in_progress" (returns 409 Conflict)

**Response:** `{ success: boolean }`

## Type Definitions

```typescript
type Status = 'backlog' | 'in_progress' | 'done';
type Label = 'frontend' | 'backend' | 'bug' | 'feature' | 'urgent';

interface Task {
  id: string;
  name: string;
  key: string;
  description: string;
  status: Status;
  labels: Label[];
}
```

## Development Notes

- Hot Module Replacement may cause in-memory data to reset
- Toast notifications auto-dismiss after 3 seconds
- Modal dialogs use Headless UI for accessibility
- All forms include validation

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

MIT
