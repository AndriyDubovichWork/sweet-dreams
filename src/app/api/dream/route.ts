import deleteFile from '@/app/api/dream/drive/deleteFile';
import getFiles from '@/app/api/dream/drive/getFiles';
import saveFileToDrive from '@/app/api/dream/drive/saveFileToDrive';
import { NextResponse } from 'next/server';
import renameFile from './drive/renameFile';
import searchFileByName from './drive/searchFileByName';
import { OrderByValues } from '@/app/features/dreams/types/store/savedDreamsStore';
import { getAllDreams } from '@/app/features/dreams/utils/DB/dreamCrud';

export async function PUT(req: Request) {
  const formData = await req.formData();
  const { searchParams } = new URL(req.url);

  const isPrivateStr = searchParams.get('isPrivate');
  if (!formData) {
    return NextResponse.json({ error: 'missing file' }, { status: 422 });
  }
  if (!isPrivateStr) {
    return NextResponse.json(
      { error: 'missing isPrivate search param' },
      { status: 422 }
    );
  }
  const isPrivate = JSON.parse(isPrivateStr.toLowerCase()) as boolean;
  const savedFile = await saveFileToDrive(formData, isPrivate);

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
  const isSortByReversed = searchParams.get('isSortByReversed');
  const name = searchParams.get('name');
  const pageToken = searchParams.get('pageToken');

  if (!sortBy)
    return NextResponse.json({ error: 'missing sortBy' }, { status: 422 });
  if (!isSortByReversed)
    return NextResponse.json(
      { error: 'missing isSortByReversed' },
      { status: 422 }
    );

  let recivedFiles;
  if (name) {
    recivedFiles = await searchFileByName(sortBy as OrderByValues, name);
  } else {
    recivedFiles = await getFiles(sortBy as OrderByValues, pageToken as string);
  }

  // console.log('====================================');
  // console.log(
  // );
  // console.log('====================================');


  // console.log(recivedFiles.data.files);

  if (recivedFiles.status !== 200) {
    return NextResponse.json(
      { error: "couldn't load files from drive" },
      { status: 500 }
    );
  }
  return NextResponse.json({
    res: await getAllDreams('name', Boolean(isSortByReversed)),
  });
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
