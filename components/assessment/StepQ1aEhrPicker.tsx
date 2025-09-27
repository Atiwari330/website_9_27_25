import { useState, useEffect } from 'react';
import { copy } from '@/lib/copy';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ehrList from '@/data/ehr-list.json';

interface StepQ1aEhrPickerProps {
  value?: string | null;
  onChange: (value: string) => void;
}

export function StepQ1aEhrPicker({ value, onChange }: StepQ1aEhrPickerProps) {
  const [search, setSearch] = useState('');
  const [showOther, setShowOther] = useState(false);

  const filteredEhrs = ehrList.items.filter((ehr) =>
    ehr.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (ehrName: string) => {
    if (ehrName === 'Other') {
      setShowOther(true);
    } else {
      onChange(ehrName);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {copy.assessment.q1.ehrPrompt}
      </h2>

      <div className="space-y-4">
        <Input
          type="text"
          placeholder={copy.assessment.q1.ehrPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />

        <div className="max-h-48 overflow-y-auto space-y-2 border rounded-lg p-2">
          {filteredEhrs.map((ehr) => (
            <button
              key={ehr.slug}
              onClick={() => handleSelect(ehr.name)}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                value === ehr.name ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              {ehr.name}
            </button>
          ))}
        </div>

        {showOther && (
          <div className="space-y-2">
            <Label>{copy.assessment.q1.ehrOther}</Label>
            <Input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter EHR name"
              maxLength={80}
            />
          </div>
        )}
      </div>
    </div>
  );
}