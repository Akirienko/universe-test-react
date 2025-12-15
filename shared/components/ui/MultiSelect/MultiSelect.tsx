'use client';

import { useState, useRef, useEffect } from 'react';
import { Label, LABEL_OPTIONS } from '@/features/tasks/types/task.types';
import { cn } from '@/shared/lib/utils';

interface MultiSelectProps {
  label?: string;
  selected: Label[];
  onChange: (labels: Label[]) => void;
}

export function MultiSelect({ label, selected, onChange }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (value: Label) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: Label) => {
    onChange(selected.filter((item) => item !== value));
  };

  const getSelectedLabels = () => {
    return LABEL_OPTIONS.filter((option) => selected.includes(option.value));
  };

  return (
    <div className="relative" ref={containerRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div
        className={cn(
          'relative min-h-[42px] px-3 py-2 border rounded-lg bg-white cursor-pointer transition-colors',
          'hover:border-gray-400',
          isOpen ? 'border-gray-900 ring-2 ring-gray-900' : 'border-gray-300'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-2 pr-6">
          {selected.length === 0 ? (
            <span className="text-gray-400 leading-6">Choose Label</span>
          ) : (
            getSelectedLabels().map((option) => (
              <span
                key={option.value}
                className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
              >
                {option.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(option.value);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-lg leading-none"
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
        <svg
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 transition-transform',
            isOpen && 'rotate-180'
          )}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {LABEL_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={cn(
                'flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-gray-50',
                selected.includes(option.value) && 'bg-gray-50'
              )}
              onClick={() => handleToggle(option.value)}
            >
              <span className="text-sm text-gray-900">{option.label}</span>
              {selected.includes(option.value) && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-gray-900"
                >
                  <path
                    d="M13.3333 4L6 11.3333L2.66667 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
