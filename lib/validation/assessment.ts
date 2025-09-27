import { z } from 'zod';

// Draft validation (partial fields allowed)
export const AssessmentDraftSchema = z.object({
  q1_notes_method: z.enum(['paper', 'ehr', 'both', 'unsure']).optional(),
  q1a_ehr_name: z.string().max(80).nullable().optional(),
  q2_compliance: z.array(
    z.enum(['42cfr', 'state_grant', 'mat_otp', 'local_portal', 'none_unsure'])
  ).optional(),
  q3_primary_pain: z.enum(['double_entry', 'denials_ar', 'state_reporting', 'scheduling', 'other']).optional(),
  q3_other_free_text: z.string().max(120).nullable().optional(),

  contact_name: z.string().min(2).max(80).optional(),
  contact_email: z.string().email().optional(),
  org_name: z.string().max(120).optional(),
  role: z.string().max(80).optional(),
  consent_to_contact: z.boolean().optional(),
});

// Submission validation (required contact fields)
export const AssessmentSubmissionSchema = z.object({
  draftId: z.string().min(8),
  turnstileToken: z.string().min(10),
  contact_name: z.string().min(2).max(80),
  contact_email: z.string().email(),
  org_name: z.string().min(2).max(120),
  role: z.string().min(2).max(80),
  consent_to_contact: z.literal(true),
});

// Create draft request
export const CreateDraftSchema = z.object({
  utm: z.record(z.string()).optional(),
  referrer: z.string().optional(),
});

export type AssessmentDraft = z.infer<typeof AssessmentDraftSchema>;
export type AssessmentSubmission = z.infer<typeof AssessmentSubmissionSchema>;
export type CreateDraftRequest = z.infer<typeof CreateDraftSchema>;