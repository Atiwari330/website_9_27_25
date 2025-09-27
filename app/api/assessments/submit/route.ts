import { NextRequest, NextResponse } from 'next/server';
import { AssessmentSubmissionSchema } from '@/lib/validation/assessment';
import { drafts } from '../../assessment-drafts/route';

// Store for idempotency keys (in production, use Redis or database)
const idempotencyKeys = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    // Check idempotency key
    const idempotencyKey = request.headers.get('Idempotency-Key');
    if (idempotencyKey && idempotencyKeys.has(idempotencyKey)) {
      // Return cached response
      return NextResponse.json(idempotencyKeys.get(idempotencyKey));
    }

    // Parse and validate request
    const body = await request.json();
    const validated = AssessmentSubmissionSchema.parse(body);

    // Get draft
    const draft = drafts.get(validated.draftId);
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

    // Check if already submitted
    if (draft.status === 'submitted') {
      return NextResponse.json(
        {
          error: {
            code: 'CONFLICT',
            message: 'Assessment already submitted',
          },
          requestId: `req_${Date.now()}`,
        },
        { status: 409 }
      );
    }

    // TODO: Verify Turnstile token
    // const isValidToken = await verifyTurnstileToken(validated.turnstileToken);
    // if (!isValidToken) {
    //   return NextResponse.json(
    //     { error: { code: 'UNAUTHORIZED', message: 'Invalid bot protection token' } },
    //     { status: 401 }
    //   );
    // }

    // Update draft with contact info and mark as submitted
    const updatedDraft = {
      ...draft,
      contact_name: validated.contact_name,
      contact_email: validated.contact_email,
      org_name: validated.org_name,
      role: validated.role,
      consent_to_contact: validated.consent_to_contact,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };

    drafts.set(validated.draftId, updatedDraft);

    // TODO: Async side effects
    // - Create/update CRM record
    // - Send confirmation email
    // - Log analytics event

    const response = {
      ok: true,
      draftId: validated.draftId,
      status: 'submitted',
      score: draft.score || 0,
      band: draft.band || 'standard',
      scheduled: false,
      next: {
        suggest: 'schedule',
        link: `${process.env.SCHEDULER_EMBED_URL || 'https://cal.com/your-org/assessment'}?email=${validated.contact_email}&d=${validated.draftId}`,
      },
    };

    // Cache response for idempotency
    if (idempotencyKey) {
      idempotencyKeys.set(idempotencyKey, response);
      // Set TTL for 24 hours (in production, use proper cache with TTL)
      setTimeout(() => idempotencyKeys.delete(idempotencyKey), 24 * 60 * 60 * 1000);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to submit assessment:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid submission data',
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
          message: 'Failed to submit assessment',
        },
        requestId: `req_${Date.now()}`,
      },
      { status: 500 }
    );
  }
}