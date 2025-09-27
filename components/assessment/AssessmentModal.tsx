'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { copy } from '@/lib/copy';
import { useAssessmentDraft } from '@/hooks/useAssessmentDraft';
import {
  AssessmentState,
  AssessmentEvent,
  AssessmentContext,
  transition,
  canProceed,
  getStepTitle,
  getStepNumber,
} from '@/lib/state-machine/assessment-machine';
import { StepIntro } from './StepIntro';
import { StepQ1NotesMethod } from './StepQ1NotesMethod';
import { StepQ1aEhrPicker } from './StepQ1aEhrPicker';
import { StepQ2Compliance } from './StepQ2Compliance';
import { StepQ3PrimaryPain } from './StepQ3PrimaryPain';
import { StepContact } from './StepContact';
import { StepSchedule } from './StepSchedule';
import { StepConfirm } from './StepConfirm';
import { AutosaveIndicator } from './AutosaveIndicator';
import { ProgressDots } from './ProgressDots';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

interface AssessmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
  prefill?: Partial<AssessmentContext>;
}

export function AssessmentModal({
  open,
  onOpenChange,
  source,
  prefill,
}: AssessmentModalProps) {
  const {
    draft,
    draftId,
    isLoading,
    error,
    lastSavedAt,
    createDraft,
    updateDraft,
    submitDraft,
  } = useAssessmentDraft();

  const [currentState, setCurrentState] = useState<AssessmentState>('intro');
  const [context, setContext] = useState<AssessmentContext>({
    currentState: 'intro',
    history: [],
    ...prefill,
  });

  // Create draft when modal opens
  useEffect(() => {
    if (open && !draftId) {
      const utm = new URLSearchParams(window.location.search);
      const utmObj = Object.fromEntries(utm.entries());
      createDraft(utmObj, document.referrer);
    }
  }, [open, draftId, createDraft]);

  // Handle state transitions
  const handleEvent = (event: AssessmentEvent) => {
    const { nextState, nextContext, effects } = transition(currentState, event, context);

    setCurrentState(nextState);
    setContext(nextContext);

    // Handle effects
    if (effects?.includes('AUTOSAVE')) {
      updateDraft(nextContext);
    }
    if (effects?.includes('SUBMIT')) {
      handleSubmit();
    }
    // TODO: Handle other effects (analytics, etc.)
  };

  const handleSubmit = async () => {
    try {
      await submitDraft({
        turnstileToken: 'TODO', // Get from Turnstile widget
        contact_name: context.contact_name,
        contact_email: context.contact_email,
        org_name: context.org_name,
        role: context.role,
        consent_to_contact: context.consent_to_contact,
      });
      handleEvent({ type: 'SUBMIT_OK' });
    } catch (err) {
      handleEvent({ type: 'SUBMIT_ERR', error: err instanceof Error ? err.message : 'Submit failed' });
    }
  };

  const canGoNext = canProceed(currentState, context);
  const totalSteps = 7;
  const currentStepNumber = getStepNumber(currentState);

  const renderStep = () => {
    switch (currentState) {
      case 'intro':
        return <StepIntro onStart={() => handleEvent({ type: 'START' })} />;
      case 'q1_notes_method':
        return (
          <StepQ1NotesMethod
            value={context.q1_notes_method}
            onChange={(value) => handleEvent({ type: 'ANSWER_Q1', value })}
          />
        );
      case 'q1a_ehr_picker':
        return (
          <StepQ1aEhrPicker
            value={context.q1a_ehr_name}
            onChange={(value) => handleEvent({ type: 'ANSWER_Q1A', value })}
          />
        );
      case 'q2_compliance':
        return (
          <StepQ2Compliance
            value={context.q2_compliance}
            onChange={(value) => handleEvent({ type: 'ANSWER_Q2', value })}
          />
        );
      case 'q3_primary_pain':
        return (
          <StepQ3PrimaryPain
            value={context.q3_primary_pain}
            otherText={context.q3_other_free_text}
            onChange={(value, otherText) =>
              handleEvent({ type: 'ANSWER_Q3', value, otherText })
            }
          />
        );
      case 'contact':
        return (
          <StepContact
            data={context}
            onChange={(data) => handleEvent({ type: 'ANSWER_CONTACT', data })}
            onSubmit={() => handleEvent({ type: 'SUBMIT_CONTACT' })}
            canSubmit={canGoNext}
          />
        );
      case 'schedule_optional':
        return (
          <StepSchedule
            email={context.contact_email}
            draftId={draftId}
            onScheduled={(time) => handleEvent({ type: 'SCHEDULED', time })}
            onSkip={() => handleEvent({ type: 'SKIP_SCHEDULING' })}
          />
        );
      case 'confirm':
        return <StepConfirm data={context} onClose={() => onOpenChange(false)} />;
      case 'error_fatal':
        return (
          <div className="text-center py-8">
            <Alert variant="destructive">
              <AlertDescription>
                Something went wrong. Please try again or contact support.
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="sr-only">
              {getStepTitle(currentState)}
            </DialogTitle>
            <AutosaveIndicator lastSavedAt={lastSavedAt} error={error} />
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close assessment"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Progress indicator */}
        {currentState !== 'intro' && currentState !== 'confirm' && (
          <div className="mb-6">
            <ProgressDots current={currentStepNumber} total={totalSteps} />
          </div>
        )}

        {/* Step content */}
        <div className="py-4">
          {renderStep()}
        </div>

        {/* Navigation */}
        {currentState !== 'intro' && currentState !== 'confirm' && currentState !== 'error_fatal' && (
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="ghost"
              onClick={() => handleEvent({ type: 'BACK' })}
              disabled={!context.history || context.history.length === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {currentState === 'schedule_optional' ? (
              <Button
                onClick={() => handleEvent({ type: 'SKIP_SCHEDULING' })}
                variant="outline"
              >
                Skip for now
              </Button>
            ) : currentState === 'contact' ? (
              <Button
                onClick={() => handleEvent({ type: 'SUBMIT_CONTACT' })}
                disabled={!canGoNext || isLoading}
              >
                {isLoading ? 'Submitting...' : copy.assessment.contact.submit}
              </Button>
            ) : (
              <Button
                onClick={() => handleEvent({ type: 'NEXT' })}
                disabled={!canGoNext}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}