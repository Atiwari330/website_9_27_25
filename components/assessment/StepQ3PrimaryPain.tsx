import { useState } from 'react';
import { copy } from '@/lib/copy';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PrimaryPain } from '@/types/assessment';

interface StepQ3PrimaryPainProps {
  value?: PrimaryPain;
  otherText?: string | null;
  onChange: (value: string, otherText?: string) => void;
}

export function StepQ3PrimaryPain({ value, otherText, onChange }: StepQ3PrimaryPainProps) {
  const [localOtherText, setLocalOtherText] = useState(otherText || '');

  const options = [
    { value: 'double_entry', label: copy.assessment.q3.options[0] },
    { value: 'denials_ar', label: copy.assessment.q3.options[1] },
    { value: 'state_reporting', label: copy.assessment.q3.options[2] },
    { value: 'scheduling', label: copy.assessment.q3.options[3] },
    { value: 'other', label: copy.assessment.q3.options[4] },
  ];

  const handleChange = (newValue: string) => {
    onChange(newValue, newValue === 'other' ? localOtherText : undefined);
  };

  const handleOtherTextChange = (text: string) => {
    setLocalOtherText(text);
    if (value === 'other') {
      onChange('other', text);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {copy.assessment.q3.prompt}
      </h2>

      <RadioGroup value={value} onValueChange={handleChange}>
        <div className="space-y-3">
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label
                htmlFor={option.value}
                className="cursor-pointer text-base font-normal"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      {value === 'other' && (
        <div className="space-y-2">
          <Label htmlFor="other-text">{copy.assessment.q3.otherPlaceholder}</Label>
          <Textarea
            id="other-text"
            value={localOtherText}
            onChange={(e) => handleOtherTextChange(e.target.value)}
            maxLength={120}
            rows={3}
            className="resize-none"
          />
          <p className="text-xs text-gray-500 text-right">
            {localOtherText.length}/120 characters
          </p>
        </div>
      )}
    </div>
  );
}