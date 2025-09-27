'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentDraft } from '@/types/assessment';
import { useDebounce } from './useDebounce';

interface UseAssessmentDraftReturn {
  draft: AssessmentDraft | null;
  draftId: string | null;
  isLoading: boolean;
  error: string | null;
  lastSavedAt: number | null;
  createDraft: (utm?: Record<string, string>, referrer?: string) => Promise<void>;
  updateDraft: (updates: Partial<AssessmentDraft>) => void;
  submitDraft: (data: any) => Promise<void>;
}

const DRAFT_STORAGE_KEY = 'assessment:draftId';
const DRAFT_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export function useAssessmentDraft(): UseAssessmentDraftReturn {
  const [draft, setDraft] = useState<AssessmentDraft | null>(null);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [pendingUpdates, setPendingUpdates] = useState<Partial<AssessmentDraft>>({});

  const debouncedUpdates = useDebounce(pendingUpdates, 800);

  // Load draft from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (stored) {
      try {
        const { id, timestamp } = JSON.parse(stored);
        const age = Date.now() - timestamp;
        if (age < DRAFT_TTL) {
          setDraftId(id);
          // TODO: Fetch draft from server
        } else {
          localStorage.removeItem(DRAFT_STORAGE_KEY);
        }
      } catch (e) {
        console.error('Failed to parse stored draft ID', e);
      }
    }

    // Check URL params for draft ID
    const params = new URLSearchParams(window.location.search);
    const urlDraftId = params.get('draft');
    if (urlDraftId) {
      setDraftId(urlDraftId);
      // TODO: Fetch draft from server
    }
  }, []);

  // Create a new draft
  const createDraft = useCallback(async (utm?: Record<string, string>, referrer?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/assessment-drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ utm, referrer }),
      });

      if (!response.ok) {
        throw new Error('Failed to create draft');
      }

      const data = await response.json();
      setDraftId(data.draftId);
      setDraft({ draftId: data.draftId, status: 'partial' });

      // Store in localStorage
      localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({ id: data.draftId, timestamp: Date.now() })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create draft');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update draft (batches updates)
  const updateDraft = useCallback((updates: Partial<AssessmentDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates } as AssessmentDraft));
    setPendingUpdates((prev) => ({ ...prev, ...updates }));
  }, []);

  // Autosave debounced updates
  useEffect(() => {
    if (!draftId || Object.keys(debouncedUpdates).length === 0) return;

    const saveDraft = async () => {
      try {
        const response = await fetch(`/api/assessment-drafts/${draftId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(debouncedUpdates),
        });

        if (!response.ok) {
          throw new Error('Failed to save draft');
        }

        const data = await response.json();
        setLastSavedAt(Date.now());
        if (data.score !== undefined) {
          setDraft((prev) => ({ ...prev, score: data.score, band: data.band } as AssessmentDraft));
        }
        setPendingUpdates({});
      } catch (err) {
        setError('Failed to save. We\'ll retry in a moment.');
      }
    };

    saveDraft();
  }, [draftId, debouncedUpdates]);

  // Submit draft
  const submitDraft = useCallback(async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/assessments/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': crypto.randomUUID(),
        },
        body: JSON.stringify({ ...data, draftId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to submit assessment');
      }

      const result = await response.json();
      setDraft((prev) => ({ ...prev, status: 'submitted' } as AssessmentDraft));
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [draftId]);

  return {
    draft,
    draftId,
    isLoading,
    error,
    lastSavedAt,
    createDraft,
    updateDraft,
    submitDraft,
  };
}