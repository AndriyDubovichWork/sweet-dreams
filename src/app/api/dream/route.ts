import deleteFile from '@/app/api/dream/drive/deleteFile';
import getFiles from '@/app/api/dream/drive/getFiles';
import saveFileToDrive from '@/app/api/dream/drive/saveFileToDrive';
import { OrderByValues } from '@/app/types/store/savedDreamsStore';
import { NextResponse } from 'next/server';
import renameFile from './drive/renameFile';
import searchFileByName from './drive/searchFileByName';

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
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sortBy = searchParams.get('sortBy');
  const name = searchParams.get('name');

  if (!sortBy)
    return NextResponse.json({ error: 'missing sortBy' }, { status: 422 });

  let recivedFiles;
  if (name) {
    recivedFiles = await searchFileByName(sortBy as OrderByValues, name);
  } else {
    recivedFiles = await getFiles(sortBy as OrderByValues);
  }

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

  if (!fileId)
    return NextResponse.json({ error: 'missing fileId' }, { status: 422 });

  const deletedFile = await deleteFile(fileId);

  if (deletedFile.status !== 204) {
    return NextResponse.json(
      { error: 'couldnt delete file from drive' },
      { status: 500 }
    );
  }
  return NextResponse.json({ res: deletedFile.data });
}
export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('fileId');
  const newName = searchParams.get('newName');

  if (!fileId || !newName) {
    return NextResponse.json(
      { error: 'missing required params' },
      { status: 422 }
    );
  }
  const renamedFile = await renameFile(fileId, newName);

  return NextResponse.json({ res: renamedFile.data });
}
