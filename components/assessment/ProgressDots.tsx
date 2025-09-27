import { cn } from '@/lib/utils';

interface ProgressDotsProps {
  current: number;
  total: number;
}

export function ProgressDots({ current, total }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={cn(
            'h-2 rounded-full transition-all',
            i < current
              ? 'w-8 bg-blue-600'
              : i === current
              ? 'w-8 bg-blue-400'
              : 'w-2 bg-gray-300'
          )}
          aria-label={`Step ${i + 1} of ${total}`}
        />
      ))}
    </div>
  );
}