import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from '@/shared/components/toast/ToastContainer';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Jira-style task management system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
