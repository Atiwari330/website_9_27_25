import { NextResponse } from 'next/server';
import ehrList from '@/data/ehr-list.json';

export async function GET() {
  // Set cache headers for CDN
  const headers = {
    'Cache-Control': 'public, max-age=86400', // 24 hours
    'Content-Type': 'application/json',
  };

  return NextResponse.json(ehrList, { headers });
}