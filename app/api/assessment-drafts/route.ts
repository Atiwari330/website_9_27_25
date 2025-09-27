import { NextRequest, NextResponse } from 'next/server';
import { CreateDraftSchema } from '@/lib/validation/assessment';
import { calculateScore, getScoreBand } from '@/lib/scoring';

// In-memory storage for demo (replace with database)
const drafts = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check (simplified)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Parse and validate request body
    const body = await request.json();
    const validatedData = CreateDraftSchema.parse(body);

    // Generate draft ID
    const draftId = `dft_${Math.random().toString(36).substring(2, 8)}`;

    // Create draft
    const draft = {
      draftId,
      ...validatedData,
      status: 'partial',
      score: 0,
      band: 'nurture',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store draft (in production, use database)
    drafts.set(draftId, draft);

    return NextResponse.json(
      {
        draftId,
        status: 'partial',
        createdAt: draft.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create draft:', error);

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
          message: 'Failed to create draft',
        },
        requestId: `req_${Date.now()}`,
      },
      { status: 500 }
    );
  }
}

// Export drafts for use in other routes (temporary solution)
export { drafts };