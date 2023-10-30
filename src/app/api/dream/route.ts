import { NextResponse } from 'next/server';
import getFile from '@/app/drive/getFile';
import saveFileToDrive from '@/app/drive/saveFileToDrive';

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('fileName');
  if (!fileName) {
    return NextResponse.json(
      { error: 'missing fileName param' },
      { status: 422 }
    );
  }
  return NextResponse.json({ data: await saveFileToDrive(fileName) });
}
// export async function POST(req: Request) {
//   return NextResponse.json({ data: await getFile() });
// }
// export async function PUT(req: Request) {
//   return NextResponse.json({ data: await createLink(' ') });
// }
