import { Button } from '@/components/ui/button';
import { copy } from '@/lib/copy';
import { Calendar } from 'lucide-react';

interface StepScheduleProps {
  email?: string;
  draftId: string | null;
  onScheduled: (time: string) => void;
  onSkip: () => void;
}

export function StepSchedule({ email, draftId, onScheduled, onSkip }: StepScheduleProps) {
  // TODO: Integrate actual scheduler (Cal.com/Calendly)
  const handleSchedule = () => {
    // Placeholder - would open scheduler embed
    const mockTime = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    onScheduled(mockTime);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          {copy.assessment.schedule.headline}
        </h2>
        <p className="text-gray-600">
          {copy.assessment.schedule.body}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 text-center">
        {/* Placeholder for scheduler embed */}
        <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <p className="text-sm text-gray-500 mb-4">
          Scheduler will be embedded here
        </p>
        <Button onClick={handleSchedule} size="lg" className="mb-3">
          {copy.assessment.schedule.schedule}
        </Button>
      </div>

      <div className="text-center">
        <Button onClick={onSkip} variant="ghost">
          {copy.assessment.schedule.skip}
        </Button>
      </div>
    </div>
  );
}