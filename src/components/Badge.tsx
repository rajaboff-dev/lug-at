import React from 'react';
import {cn} from "../lib/cn.ts";

export interface BadgeProps {
  color?: 'blue' | 'gray' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink';
  children: React.ReactNode;
  className?: string;
}

const colorClasses = {
  blue: 'bg-blue-400/40 text-blue-800 ring-blue-200/20',
  gray: 'bg-gray-400/40 text-gray-800 ring-gray-200/20',
  red: 'bg-red-400/40 text-red-800 ring-red-200/20',
  green: 'bg-green-400/40 text-green-800 ring-green-200/20',
  yellow: 'bg-yellow-500/40 text-yellow-800 ring-yellow-200/20',
  indigo: 'bg-indigo-400/40 text-indigo-800 ring-indigo-200/20',
  purple: 'bg-purple-400/40 text-purple-800 ring-purple-200/20',
  pink: 'bg-pink-400/40 text-pink-800 ring-pink-200/20',
};
export default function Badge({ color = 'gray', children, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-1 text-xs text-center font-medium ring-1 ring-inset line-clamp-1',
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}