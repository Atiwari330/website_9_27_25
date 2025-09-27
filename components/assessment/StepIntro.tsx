import { Button } from '@/components/ui/button';
import { copy } from '@/lib/copy';
import { Phone } from 'lucide-react';

interface StepIntroProps {
  onStart: () => void;
}

export function StepIntro({ onStart }: StepIntroProps) {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        {copy.assessment.intro.title}
      </h2>
      <p className="text-gray-600 mb-8">
        {copy.assessment.intro.subtext}
      </p>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <Button onClick={onStart} size="lg" className="w-full">
          {copy.assessment.intro.start}
        </Button>
        <a
          href="tel:+1234567890"
          className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Phone className="h-4 w-4" />
          {copy.assessment.intro.alternate}
        </a>
      </div>
    </div>
  );
}