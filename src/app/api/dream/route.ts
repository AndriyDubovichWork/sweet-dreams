import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export function GET(req: Request) {
  return NextResponse.json({ hello: 'world', req });
}
export function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  // google.drive({ version: 'v3' });

  return NextResponse.json({ path: searchParams.get('path') });
}
