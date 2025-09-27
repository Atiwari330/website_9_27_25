export type NotesMethod = 'paper' | 'ehr' | 'both' | 'unsure';
export type ComplianceFlag = '42cfr' | 'state_grant' | 'mat_otp' | 'local_portal' | 'none_unsure';
export type PrimaryPain = 'double_entry' | 'denials_ar' | 'state_reporting' | 'scheduling' | 'other';
export type AssessmentStatus = 'partial' | 'submitted';
export type ScoreBand = 'nurture' | 'standard' | 'priority';

export interface AssessmentDraft {
  draftId?: string;
  utm?: Record<string, string>;
  referrer?: string;

  // Q1: Notes Method
  q1_notes_method?: NotesMethod;
  q1a_ehr_name?: string | null;

  // Q2: Compliance
  q2_compliance?: ComplianceFlag[];

  // Q3: Primary Pain
  q3_primary_pain?: PrimaryPain;
  q3_other_free_text?: string | null;

  // Contact Info
  contact_name?: string;
  contact_email?: string;
  org_name?: string;
  role?: string;
  consent_to_contact?: boolean;

  // Scheduling
  scheduled?: boolean;
  scheduled_time?: string | null;

  // Meta
  score?: number;
  band?: ScoreBand;
  status?: AssessmentStatus;
  lastSavedAt?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AssessmentSubmission {
  draftId: string;
  turnstileToken: string;
  contact_name: string;
  contact_email: string;
  org_name: string;
  role: string;
  consent_to_contact: true;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
  requestId: string;
}