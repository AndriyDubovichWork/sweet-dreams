import { NextResponse } from 'next/server';
import getFile from '@/app/drive/getFile';
import saveFileToDrive from '@/app/drive/saveFileToDrive';

export async function PUT(req: Request) {
  const formData = await req.formData();
  if (!formData) {
    return NextResponse.json({ error: 'missing file' }, { status: 422 });
  }
  const savedFile = await saveFileToDrive(formData);
  if (savedFile.status !== 200) {
    return NextResponse.json(
      { error: 'couldnt upload file to drive' },
      { status: 500 }
    );
  }
  return NextResponse.json({ file: savedFile.data });
}
