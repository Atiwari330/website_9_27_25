import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface OptionTileProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function OptionTile({
  value,
  label,
  icon: Icon,
  selected,
  onClick,
  disabled,
}: OptionTileProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative p-6 rounded-lg border-2 transition-all text-left',
        'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        selected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300 bg-white',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      aria-pressed={selected}
    >
      {Icon && (
        <Icon
          className={cn(
            'h-8 w-8 mb-3',
            selected ? 'text-blue-600' : 'text-gray-400'
          )}
        />
      )}
      <span className={cn(
        'text-lg font-medium',
        selected ? 'text-blue-900' : 'text-gray-900'
      )}>
        {label}
      </span>
      {selected && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
}