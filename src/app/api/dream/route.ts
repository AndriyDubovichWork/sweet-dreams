import deleteFile from '@/app/api/dream/drive/deleteFile';
import getFiles from '@/app/api/dream/drive/getFiles';
import saveFileToDrive from '@/app/api/dream/drive/saveFileToDrive';
import { NextResponse } from 'next/server';
import renameFile from './drive/renameFile';
import searchFileByName from './drive/searchFileByName';
import { OrderByValues } from '@/app/features/dreams/types/store/savedDreamsStore';

export async function PUT(req: Request) {
  const formData = await req.formData();
  if (!formData) {
    return NextResponse.json({ error: 'missing file' }, { status: 422 });
  }

  const savedFile = await saveFileToDrive(formData);
  if (savedFile.status !== 200) {
    return NextResponse.json(
      { error: "couldn't upload file to drive" },
      { status: 500 }
    );
  }
  return NextResponse.json({ file: savedFile.data });
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sortBy = searchParams.get('sortBy');
  const name = searchParams.get('name');
  const pageToken = searchParams.get('pageToken');

  if (!sortBy)
    return NextResponse.json({ error: 'missing sortBy' }, { status: 422 });

  let recivedFiles;
  if (name) {
    recivedFiles = await searchFileByName(sortBy as OrderByValues, name);
  } else {
    recivedFiles = await getFiles(sortBy as OrderByValues, pageToken as string);
  }

  if (recivedFiles.status !== 200) {
    return NextResponse.json(
      { error: "couldn't load files from drive" },
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
      { error: "couldn't delete file from drive" },
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
