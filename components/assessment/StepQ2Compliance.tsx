import { copy } from '@/lib/copy';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { ComplianceFlag } from '@/types/assessment';

interface StepQ2ComplianceProps {
  value?: ComplianceFlag[];
  onChange: (value: string[]) => void;
}

export function StepQ2Compliance({ value = [], onChange }: StepQ2ComplianceProps) {
  const options = [
    { value: '42cfr', label: copy.assessment.q2.options[0] },
    { value: 'state_grant', label: copy.assessment.q2.options[1] },
    { value: 'mat_otp', label: copy.assessment.q2.options[2] },
    { value: 'local_portal', label: copy.assessment.q2.options[3] },
    { value: 'none_unsure', label: copy.assessment.q2.options[4] },
  ];

  const handleToggle = (optionValue: string) => {
    if (optionValue === 'none_unsure') {
      onChange(['none_unsure']);
    } else {
      const filtered = value.filter((v) => v !== 'none_unsure');
      if (filtered.some((v) => v === optionValue)) {
        onChange(filtered.filter((v) => v !== optionValue));
      } else {
        onChange([...filtered, optionValue]);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-2">
        <h2 className="text-xl font-semibold text-gray-900">
          {copy.assessment.q2.prompt}
        </h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-5 w-5 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{copy.assessment.q2.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <Badge
            key={option.value}
            variant={value.includes(option.value as ComplianceFlag) ? 'default' : 'outline'}
            className="cursor-pointer px-4 py-2 text-sm"
            onClick={() => handleToggle(option.value)}
          >
            {option.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}