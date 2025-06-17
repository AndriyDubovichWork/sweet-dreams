import { drive_v3 } from '@googleapis/drive';
import { Readable } from 'stream';
import Auth from './Auth';
import { createDream } from '@/app/features/dreams/utils/DB/dreamCrud';
type responseFile = {
  kind: string;
  id: string;
  name: string;
  mimeType: string;
};
export default async function saveFileToDrive(
  file: FormData,
  isPrivate: boolean
) {
  const drive = (await Auth()) as drive_v3.Drive;
  const blob = file.get('file') as File;

  const buffer = Buffer.from(await blob.arrayBuffer());
  const stream = new Readable();

  stream.push(buffer);
  stream.push(null);

  const createdFile = await drive.files.create({
    requestBody: {
      name: blob.name
        .replaceAll('tokenforslashwithoutitwillcutastring', '/')
        .replaceAll('/private/', ''),
      mimeType: 'audio/mpeg',
      parents: [process.env.FOLDER_ID as string],
    },
    media: {
      mimeType: 'audio/mpeg',
      body: stream,
    },
  });

  const responseFile = createdFile.data as responseFile;
  createDream({
    fileId: responseFile.id,
    size: blob.size,
    name: responseFile.name,
    createdTime: new Date(),
    lastUpdatedTime: new Date(),
    isPrivate,
    playableUrl: `https://drive.google.com/file/d/${responseFile.id}/preview`,
    webContentLink: `https://drive.google.com/uc?id=${responseFile.id}&export=download`,
  });
  return createdFile;
}
