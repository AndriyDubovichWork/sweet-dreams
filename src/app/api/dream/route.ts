import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { drive, auth } from '@googleapis/drive';

export function GET(req: Request) {
  return NextResponse.json({ hello: 'world', req });
}
export async function POST(req: Request) {
  const session: any = await getServerSession();
  const token: any = {
    accessToken: session?.accessToken,
    refreshToken: session?.refreshToken,
  };

  if (!session) {
    return NextResponse.json({ code: 401, error: 'No Session Active' });
  }

  const accessToken = token?.accessToken;
  const refreshToken = token?.refreshToken;

  if (!accessToken) {
    return NextResponse.json({ code: 401, error: 'No Access Token' });
  }

  const oauth2Client = new auth.OAuth2({});

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  return NextResponse.json({ code: 401, error: 'No Access Token' });
}
