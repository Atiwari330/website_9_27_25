import type { AssessmentDraft, ScoreBand } from '@/types/assessment';

export function calculateScore(draft: AssessmentDraft): number {
  let score = 0;

  // +2 if EHR name present and not "other"
  if (draft.q1a_ehr_name && draft.q1a_ehr_name.toLowerCase() !== 'other') {
    score += 2;
  }

  // +2 if compliance includes any except none_unsure
  if (draft.q2_compliance && draft.q2_compliance.length > 0) {
    const hasCompliance = draft.q2_compliance.some(
      flag => flag !== 'none_unsure'
    );
    if (hasCompliance) {
      score += 2;
    }
  }

  // +2 if primary pain is denials/AR or state reporting
  if (draft.q3_primary_pain &&
      ['denials_ar', 'state_reporting'].includes(draft.q3_primary_pain)) {
    score += 2;
  }

  // +1-3 from enrichment (placeholder for future enhancement)
  // This would be added after domain enrichment API call

  return Math.min(score, 10); // Cap at 10
}

export function getScoreBand(score: number): ScoreBand {
  if (score <= 2) return 'nurture';
  if (score <= 5) return 'standard';
  return 'priority';
}

export function getSLA(band: ScoreBand): string {
  switch (band) {
    case 'priority':
      return '24 hours';
    case 'standard':
      return '48-72 hours';
    case 'nurture':
      return '3-5 business days';
    default:
      return '3-5 business days';
  }
}