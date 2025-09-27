import { copy } from '@/lib/copy';
import { Check, Loader2, AlertCircle } from 'lucide-react';

interface AutosaveIndicatorProps {
  lastSavedAt?: number | null;
  error?: string | null;
  saving?: boolean;
}

export function AutosaveIndicator({ lastSavedAt, error, saving }: AutosaveIndicatorProps) {
  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-600">
        <AlertCircle className="h-4 w-4" />
        <span>{copy.autosave.error}</span>
      </div>
    );
  }

  if (saving) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{copy.autosave.saving}</span>
      </div>
    );
  }

  if (lastSavedAt) {
    const secondsAgo = Math.floor((Date.now() - lastSavedAt) / 1000);
    const text = secondsAgo < 5 ? copy.autosave.saved : `Saved ${secondsAgo}s ago`;

    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <Check className="h-4 w-4" />
        <span>{text}</span>
      </div>
    );
  }

  return null;
}