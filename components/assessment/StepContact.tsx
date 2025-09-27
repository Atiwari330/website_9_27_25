import { useState } from 'react';
import { copy } from '@/lib/copy';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { AssessmentDraft } from '@/types/assessment';

interface StepContactProps {
  data: Partial<AssessmentDraft>;
  onChange: (data: Partial<AssessmentDraft>) => void;
  onSubmit: () => void;
  canSubmit: boolean;
}

export function StepContact({ data, onChange, onSubmit, canSubmit }: StepContactProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (field: keyof AssessmentDraft, value: any) => {
    onChange({ [field]: value });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateField = (field: string, value: any) => {
    switch (field) {
      case 'contact_name':
        if (!value || value.length < 2) return copy.validation.nameRequired;
        break;
      case 'contact_email':
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return copy.validation.emailInvalid;
        break;
      case 'org_name':
        if (!value) return copy.validation.orgRequired;
        break;
      case 'role':
        if (!value) return copy.validation.roleRequired;
        break;
      case 'consent_to_contact':
        if (!value) return copy.validation.consentRequired;
        break;
    }
    return '';
  };

  const handleBlur = (field: string) => {
    const error = validateField(field, (data as any)[field]);
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {copy.assessment.contact.headline}
      </h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="contact_name">{copy.assessment.contact.fields.name}</Label>
          <Input
            id="contact_name"
            type="text"
            value={data.contact_name || ''}
            onChange={(e) => handleFieldChange('contact_name', e.target.value)}
            onBlur={() => handleBlur('contact_name')}
            required
            aria-describedby={errors.contact_name ? 'name-error' : undefined}
          />
          {errors.contact_name && (
            <p id="name-error" className="text-sm text-red-600 mt-1">
              {errors.contact_name}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="contact_email">{copy.assessment.contact.fields.email}</Label>
          <Input
            id="contact_email"
            type="email"
            value={data.contact_email || ''}
            onChange={(e) => handleFieldChange('contact_email', e.target.value)}
            onBlur={() => handleBlur('contact_email')}
            required
            aria-describedby={errors.contact_email ? 'email-error' : undefined}
          />
          {errors.contact_email && (
            <p id="email-error" className="text-sm text-red-600 mt-1">
              {errors.contact_email}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="org_name">{copy.assessment.contact.fields.org}</Label>
          <Input
            id="org_name"
            type="text"
            value={data.org_name || ''}
            onChange={(e) => handleFieldChange('org_name', e.target.value)}
            onBlur={() => handleBlur('org_name')}
            required
            aria-describedby={errors.org_name ? 'org-error' : undefined}
          />
          {errors.org_name && (
            <p id="org-error" className="text-sm text-red-600 mt-1">
              {errors.org_name}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="role">{copy.assessment.contact.fields.role}</Label>
          <Input
            id="role"
            type="text"
            value={data.role || ''}
            onChange={(e) => handleFieldChange('role', e.target.value)}
            onBlur={() => handleBlur('role')}
            required
            aria-describedby={errors.role ? 'role-error' : undefined}
          />
          {errors.role && (
            <p id="role-error" className="text-sm text-red-600 mt-1">
              {errors.role}
            </p>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="consent"
            checked={data.consent_to_contact || false}
            onCheckedChange={(checked) =>
              handleFieldChange('consent_to_contact', checked)
            }
            required
          />
          <Label htmlFor="consent" className="text-sm leading-tight cursor-pointer">
            {copy.assessment.contact.consent}
          </Label>
        </div>
        {errors.consent_to_contact && (
          <p className="text-sm text-red-600 mt-1">{errors.consent_to_contact}</p>
        )}
      </div>

      <div className="text-xs text-gray-500">
        {copy.assessment.contact.spamNote}
      </div>
    </div>
  );
}