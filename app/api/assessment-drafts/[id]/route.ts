import { NextRequest, NextResponse } from 'next/server';
import { AssessmentDraftSchema } from '@/lib/validation/assessment';
import { calculateScore, getScoreBand } from '@/lib/scoring';
import { drafts } from '../route';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const draftId = params.id;

    // Check if draft exists
    const existingDraft = drafts.get(draftId);
    if (!existingDraft) {
      return NextResponse.json(
        {
          error: {
            code: 'NOT_FOUND',
            message: 'Draft not found',
          },
          requestId: `req_${Date.now()}`,
        },
        { status: 404 }
      );
    }

    // Parse and validate patch data
    const body = await request.json();
    const validatedPatch = AssessmentDraftSchema.partial().parse(body);

    // Merge with existing draft
    const updatedDraft = {
      ...existingDraft,
      ...validatedPatch,
      updatedAt: new Date().toISOString(),
    };

    // Calculate score
    const score = calculateScore(updatedDraft);
    const band = getScoreBand(score);
    updatedDraft.score = score;
    updatedDraft.band = band;

    // Save updated draft
    drafts.set(draftId, updatedDraft);

    return NextResponse.json({
      ok: true,
      lastSavedAt: new Date().toISOString(),
      score,
      band,
      status: updatedDraft.status,
    });
  } catch (error) {
    console.error('Failed to update draft:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            fields: (error as any).errors,
          },
          requestId: `req_${Date.now()}`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL',
          message: 'Failed to update draft',
        },
        requestId: `req_${Date.now()}`,
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const draftId = params.id;
    const draft = drafts.get(draftId);

    if (!draft) {
      return NextResponse.json(
        {
          error: {
            code: 'NOT_FOUND',
            message: 'Draft not found',
          },
          requestId: `req_${Date.now()}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(draft);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL',
          message: 'Failed to retrieve draft',
        },
        requestId: `req_${Date.now()}`,
      },
      { status: 500 }
    );
  }
}