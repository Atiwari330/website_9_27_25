import { Button } from '@/components/ui/button';
import { copy } from '@/lib/copy';
import { CheckCircle } from 'lucide-react';
import { AssessmentContext } from '@/lib/state-machine/assessment-machine';

interface StepConfirmProps {
  data: AssessmentContext;
  onClose: () => void;
}

export function StepConfirm({ data, onClose }: StepConfirmProps) {
  return (
    <div className="text-center py-8">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />

      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        {copy.assessment.confirm.title}
      </h2>
      <p className="text-gray-600 mb-8">
        {copy.assessment.confirm.body}
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
        <h3 className="font-semibold text-gray-900 mb-3">Your Assessment Summary:</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {data.q1_notes_method && (
            <li>
              <span className="font-medium">Notes method:</span> {data.q1_notes_method}
              {data.q1a_ehr_name && ` (${data.q1a_ehr_name})`}
            </li>
          )}
          {data.q2_compliance && data.q2_compliance.length > 0 && (
            <li>
              <span className="font-medium">Compliance:</span>{' '}
              {data.q2_compliance.join(', ')}
            </li>
          )}
          {data.q3_primary_pain && (
            <li>
              <span className="font-medium">Primary pain:</span> {data.q3_primary_pain}
              {data.q3_other_free_text && ` - ${data.q3_other_free_text}`}
            </li>
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={onClose} size="lg" className="w-full">
          Close
        </Button>
        <div className="flex gap-4 justify-center">
          <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
            {copy.assessment.confirm.addContext}
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
            {copy.assessment.confirm.reschedule}
          </a>
        </div>
      </div>
    </div>
  );
}