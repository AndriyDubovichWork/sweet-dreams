import { NextResponse } from 'next/server';
import saveFileToDrive from '@/app/api/dream/drive/saveFileToDrive';
import getFiles from '@/app/api/dream/drive/getFiles';
import deleteFile from '@/app/api/dream/drive/deleteFile';

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
export async function GET() {
  const recivedFiles = await getFiles();

  if (recivedFiles.status !== 200) {
    return NextResponse.json(
      { error: 'couldnt load files from drive' },
      { status: 500 }
    );
  }
  return NextResponse.json({ res: recivedFiles.data });
}
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('fileId');

  if (!fileId) {
    return NextResponse.json({ error: 'missing fileId' }, { status: 422 });
  }

  const deletedFile = await deleteFile(fileId);

  if (deletedFile.status !== 204) {
    return NextResponse.json(
      { error: 'couldnt delete file from drive' },
      { status: 500 }
    );
  }
  return NextResponse.json({ res: deletedFile.data });
}
