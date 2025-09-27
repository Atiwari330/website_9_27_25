import type { AssessmentDraft, ComplianceFlag } from '@/types/assessment';

export type AssessmentState =
  | 'intro'
  | 'q1_notes_method'
  | 'q1a_ehr_picker'
  | 'q2_compliance'
  | 'q3_primary_pain'
  | 'contact'
  | 'schedule_optional'
  | 'confirm'
  | 'error_fatal';

export type AssessmentEvent =
  | { type: 'START' }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'CLOSE' }
  | { type: 'SKIP' }
  | { type: 'SUBMIT_CONTACT' }
  | { type: 'SCHEDULED'; time: string }
  | { type: 'SKIP_SCHEDULING' }
  | { type: 'ANSWER_Q1'; value: string }
  | { type: 'ANSWER_Q1A'; value: string }
  | { type: 'ANSWER_Q2'; value: string[] }
  | { type: 'ANSWER_Q3'; value: string; otherText?: string }
  | { type: 'ANSWER_CONTACT'; data: Partial<AssessmentDraft> }
  | { type: 'PATCH_OK' }
  | { type: 'PATCH_ERR'; error: string }
  | { type: 'CREATE_DRAFT_OK'; draftId: string }
  | { type: 'CREATE_DRAFT_ERR'; error: string }
  | { type: 'SUBMIT_OK' }
  | { type: 'SUBMIT_ERR'; error: string }
  | { type: 'RESUME_DRAFT'; draftId: string; data: AssessmentDraft };

export interface AssessmentContext extends AssessmentDraft {
  currentState: AssessmentState;
  history: AssessmentState[];
  error?: string;
}

// Guards
export const guards = {
  hasNotesMethod: (ctx: AssessmentContext) => !!ctx.q1_notes_method,
  needsEhrPicker: (ctx: AssessmentContext) => ctx.q1_notes_method === 'ehr',
  hasEhrName: (ctx: AssessmentContext) => !!ctx.q1a_ehr_name,
  hasCompliance: (ctx: AssessmentContext) => Array.isArray(ctx.q2_compliance) && ctx.q2_compliance.length > 0,
  hasPrimaryPain: (ctx: AssessmentContext) => !!ctx.q3_primary_pain,
  contactValid: (ctx: AssessmentContext) => {
    return !!(
      ctx.contact_name &&
      ctx.contact_name.length >= 2 &&
      ctx.contact_email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctx.contact_email) &&
      ctx.org_name &&
      ctx.role &&
      ctx.consent_to_contact === true
    );
  },
  canGoBack: (ctx: AssessmentContext) => ctx.history.length > 0,
  hasDraft: (ctx: AssessmentContext) => !!ctx.draftId,
};

// State machine transition function
export function transition(
  state: AssessmentState,
  event: AssessmentEvent,
  ctx: AssessmentContext
): { nextState: AssessmentState; nextContext: AssessmentContext; effects?: string[] } {
  const effects: string[] = [];
  let nextState = state;
  let nextContext = { ...ctx };

  switch (state) {
    case 'intro':
      if (event.type === 'START') {
        nextState = 'q1_notes_method';
        nextContext.history = [...(ctx.history || []), 'intro'];
        effects.push('CREATE_DRAFT', 'ANALYTICS_STEP_VIEWED');
      }
      if (event.type === 'CLOSE') {
        effects.push('ANALYTICS_ABANDONED', 'PERSIST_LOCAL');
      }
      break;

    case 'q1_notes_method':
      if (event.type === 'ANSWER_Q1') {
        nextContext.q1_notes_method = event.value as any;
        effects.push('AUTOSAVE', 'ANALYTICS_Q1_ANSWERED');
      }
      if (event.type === 'NEXT' && guards.hasNotesMethod(nextContext)) {
        nextState = guards.needsEhrPicker(nextContext) ? 'q1a_ehr_picker' : 'q2_compliance';
        nextContext.history = [...(ctx.history || []), 'q1_notes_method'];
        effects.push('ANALYTICS_STEP_VIEWED');
      }
      if (event.type === 'BACK' && guards.canGoBack(nextContext)) {
        nextState = nextContext.history[nextContext.history.length - 1];
        nextContext.history = nextContext.history.slice(0, -1);
      }
      break;

    case 'q1a_ehr_picker':
      if (event.type === 'ANSWER_Q1A') {
        nextContext.q1a_ehr_name = event.value;
        effects.push('AUTOSAVE', 'ANALYTICS_Q1A_ANSWERED');
      }
      if (event.type === 'NEXT' && guards.hasEhrName(nextContext)) {
        nextState = 'q2_compliance';
        nextContext.history = [...(ctx.history || []), 'q1a_ehr_picker'];
        effects.push('ANALYTICS_STEP_VIEWED');
      }
      if (event.type === 'BACK') {
        nextState = 'q1_notes_method';
        nextContext.history = nextContext.history.slice(0, -1);
      }
      break;

    case 'q2_compliance':
      if (event.type === 'ANSWER_Q2') {
        nextContext.q2_compliance = event.value as ComplianceFlag[];
        effects.push('AUTOSAVE', 'ANALYTICS_Q2_ANSWERED');
      }
      if (event.type === 'NEXT' && guards.hasCompliance(nextContext)) {
        nextState = 'q3_primary_pain';
        nextContext.history = [...(ctx.history || []), 'q2_compliance'];
        effects.push('ANALYTICS_STEP_VIEWED');
      }
      if (event.type === 'BACK') {
        nextState = guards.needsEhrPicker(nextContext) ? 'q1a_ehr_picker' : 'q1_notes_method';
        nextContext.history = nextContext.history.slice(0, -1);
      }
      break;

    case 'q3_primary_pain':
      if (event.type === 'ANSWER_Q3') {
        nextContext.q3_primary_pain = event.value as any;
        if (event.otherText) {
          nextContext.q3_other_free_text = event.otherText.slice(0, 120);
        }
        effects.push('AUTOSAVE', 'ANALYTICS_Q3_ANSWERED');
      }
      if (event.type === 'NEXT' && guards.hasPrimaryPain(nextContext)) {
        nextState = 'contact';
        nextContext.history = [...(ctx.history || []), 'q3_primary_pain'];
        effects.push('ANALYTICS_STEP_VIEWED');
      }
      if (event.type === 'BACK') {
        nextState = 'q2_compliance';
        nextContext.history = nextContext.history.slice(0, -1);
      }
      break;

    case 'contact':
      if (event.type === 'ANSWER_CONTACT') {
        nextContext = { ...nextContext, ...event.data };
        effects.push('AUTOSAVE');
      }
      if (event.type === 'SUBMIT_CONTACT' && guards.contactValid(nextContext)) {
        nextState = 'schedule_optional';
        nextContext.history = [...(ctx.history || []), 'contact'];
        effects.push('SUBMIT', 'ANALYTICS_CONTACT_SUBMITTED');
      }
      if (event.type === 'BACK') {
        nextState = 'q3_primary_pain';
        nextContext.history = nextContext.history.slice(0, -1);
      }
      break;

    case 'schedule_optional':
      if (event.type === 'SCHEDULED') {
        nextContext.scheduled = true;
        nextContext.scheduled_time = event.time;
        nextState = 'confirm';
        effects.push('AUTOSAVE', 'ANALYTICS_SCHEDULED');
      }
      if (event.type === 'SKIP_SCHEDULING') {
        nextState = 'confirm';
        effects.push('AUTOSAVE');
      }
      if (event.type === 'BACK') {
        nextState = 'contact';
        nextContext.history = nextContext.history.slice(0, -1);
      }
      break;

    case 'confirm':
      if (event.type === 'CLOSE') {
        effects.push('PERSIST_LOCAL_CLEAR', 'ANALYTICS_COMPLETED');
      }
      break;

    case 'error_fatal':
      // Terminal state
      break;

    default:
      // Handle common events
      if (event.type === 'CLOSE') {
        effects.push('AUTOSAVE', 'PERSIST_LOCAL', 'ANALYTICS_ABANDONED');
      }
      if (event.type === 'CREATE_DRAFT_ERR') {
        nextState = 'error_fatal';
        nextContext.error = event.error;
      }
      if (event.type === 'SUBMIT_ERR') {
        nextState = 'contact';
        nextContext.error = event.error;
      }
  }

  nextContext.currentState = nextState;
  return { nextState, nextContext, effects };
}

// Helper to get step title for accessibility
export function getStepTitle(state: AssessmentState): string {
  const titles: Record<AssessmentState, string> = {
    intro: 'Introduction',
    q1_notes_method: 'Notes Method',
    q1a_ehr_picker: 'Select EHR',
    q2_compliance: 'Compliance Requirements',
    q3_primary_pain: 'Primary Pain Point',
    contact: 'Contact Information',
    schedule_optional: 'Schedule Review',
    confirm: 'Confirmation',
    error_fatal: 'Error',
  };
  return titles[state] || 'Assessment';
}

// Helper to get step number
export function getStepNumber(state: AssessmentState): number {
  const steps: AssessmentState[] = [
    'intro',
    'q1_notes_method',
    'q1a_ehr_picker',
    'q2_compliance',
    'q3_primary_pain',
    'contact',
    'schedule_optional',
    'confirm',
  ];
  const index = steps.indexOf(state);
  return index !== -1 ? index : 0;
}

// Helper to check if can proceed
export function canProceed(state: AssessmentState, ctx: AssessmentContext): boolean {
  switch (state) {
    case 'q1_notes_method':
      return guards.hasNotesMethod(ctx);
    case 'q1a_ehr_picker':
      return guards.hasEhrName(ctx);
    case 'q2_compliance':
      return guards.hasCompliance(ctx);
    case 'q3_primary_pain':
      return guards.hasPrimaryPain(ctx);
    case 'contact':
      return guards.contactValid(ctx);
    default:
      return true;
  }
}