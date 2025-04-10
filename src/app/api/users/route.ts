import { NextResponse } from 'next/server';

export function GET(req: Request) {
  const allowedUsers = process.env.USERS_EMAILS_LIST?.split('|') || [''];
  return NextResponse.json({ res: allowedUsers });
}
