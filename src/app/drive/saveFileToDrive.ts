import { drive_v3 } from '@googleapis/drive';
import Auth from './Auth';
import { Readable } from 'stream';

export default async function saveFileToDrive(file: FormData) {
  const drive = (await Auth()) as drive_v3.Drive;

  const blob = file.get('file') as Blob;

  const buffer = Buffer.from(await blob.arrayBuffer());
  const stream = new Readable();

  stream.push(buffer);
  stream.push(null);

  const sweetDreamsFolderID = '1ELrjadQU1A2PEHN4TfAO1QYPT2p5dNfK';
  const name = new Date().toLocaleDateString('en-GB');

  const createdFile = await drive.files.create({
    requestBody: {
      name: `${name}.mp3`,
      mimeType: 'audio/mpeg',
      parents: [sweetDreamsFolderID],
    },
    media: {
      mimeType: 'audio/mpeg',
      body: stream,
    },
  });

  return createdFile;
}
