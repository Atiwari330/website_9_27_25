import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { drafts } from '../../assessment-drafts/route';

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  // Simple HMAC verification (adjust based on your scheduler's method)
  const expectedSignature = createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return signature === expectedSignature;
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('X-Webhook-Signature');
    const secret = process.env.SCHEDULER_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return NextResponse.json(
        {
          error: {
            code: 'UNAUTHORIZED',
            message: 'Missing signature or secret',
          },
          requestId: `req_${Date.now()}`,
        },
        { status: 401 }
      );
    }

    const body = await request.text();

    // Verify signature
    // TODO: Implement actual signature verification based on scheduler
    // if (!verifyWebhookSignature(body, signature, secret)) {
    //   return NextResponse.json(
    //     { error: { code: 'UNAUTHORIZED', message: 'Invalid signature' } },
    //     { status: 401 }
    //   );
    // }

    const data = JSON.parse(body);

    // Extract draft ID from metadata
    const draftId = data.payload?.metadata?.draftId;
    if (!draftId) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Missing draft ID in webhook',
          },
          requestId: `req_${Date.now()}`,
        },
        { status: 400 }
      );
    }

    // Update draft with scheduling info
    const draft = drafts.get(draftId);
    if (draft) {
      draft.scheduled = true;
      draft.scheduled_time = data.payload.start_time;
      drafts.set(draftId, draft);

      // TODO: Update CRM with scheduling info
      // TODO: Send analytics event
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL',
          message: 'Webhook processing failed',
        },
        requestId: `req_${Date.now()}`,
      },
      { status: 500 }
    );
  }
}