import { copy } from '@/lib/copy';
import { OptionTile } from '../ui/OptionTile';
import { NotesMethod } from '@/types/assessment';
import { FileText, Monitor, Layers, HelpCircle } from 'lucide-react';

interface StepQ1NotesMethodProps {
  value?: NotesMethod;
  onChange: (value: string) => void;
}

export function StepQ1NotesMethod({ value, onChange }: StepQ1NotesMethodProps) {
  const options = [
    { value: 'paper', label: copy.assessment.q1.options[0], icon: FileText },
    { value: 'ehr', label: copy.assessment.q1.options[1], icon: Monitor },
    { value: 'both', label: copy.assessment.q1.options[2], icon: Layers },
    { value: 'unsure', label: copy.assessment.q1.options[3], icon: HelpCircle },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {copy.assessment.q1.prompt}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <OptionTile
            key={option.value}
            value={option.value}
            label={option.label}
            icon={option.icon}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}