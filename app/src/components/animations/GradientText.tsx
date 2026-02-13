import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({ children, className = '', animate = false }: GradientTextProps) {
  return (
    <span
      className={`
        bg-clip-text text-transparent 
        bg-gradient-to-r from-purple-400 to-purple-600
        ${animate ? 'animate-shimmer' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
