'use client';

import { Toast as ToastType } from '@/shared/types/types';
import { useToastStore } from './toast-store';
import { cn } from '@/shared/lib/utils';

interface ToastProps {
  toast: ToastType;
}

export function Toast({ toast }: ToastProps) {
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 px-4 py-3 rounded-lg shadow-lg text-white min-w-[300px] animate-slide-in',
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      )}
    >
      <span className="text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-white hover:text-gray-200 text-xl leading-none transition-colors"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
