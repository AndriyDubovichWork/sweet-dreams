import { drive_v3 } from '@googleapis/drive';
import Auth from './Auth';
import { Readable } from 'stream';

export default async function saveFileToDrive(file: FormData) {
  const drive = (await Auth()) as drive_v3.Drive;
  const blob = file.get('file') as File;

  const buffer = Buffer.from(await blob.arrayBuffer());
  const stream = new Readable();

  stream.push(buffer);
  stream.push(null);

  const createdFile = await drive.files.create({
    requestBody: {
      name: blob.name,
      mimeType: 'audio/mpeg',
      parents: [process.env.FOLDER_ID as string],
    },
    media: {
      mimeType: 'audio/mpeg',
      body: stream,
    },
  });

  return createdFile;
}
