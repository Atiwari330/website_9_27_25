import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get('Authorization');
    const apiKey = process.env.EMAIL_API_KEY;

    if (!authHeader || authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json(
        {
          error: {
            code: 'UNAUTHORIZED',
            message: 'Invalid API key',
          },
          requestId: `req_${Date.now()}`,
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    // TODO: Implement actual email sending (Resend/Postmark)
    console.log('Email confirmation request:', {
      to: body.to,
      subject: 'Your Free Stack Assessment is in progress',
    });

    // Simulate email queued response
    return NextResponse.json(
      { queued: true },
      { status: 202 }
    );
  } catch (error) {
    console.error('Email service error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL',
          message: 'Email service failed',
        },
        requestId: `req_${Date.now()}`,
      },
      { status: 500 }
    );
  }
}