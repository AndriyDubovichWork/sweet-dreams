import { drive_v3 } from '@googleapis/drive';
import Auth from './Auth';
import fs from 'fs';
import path from 'path';

export default async function saveFileToDrive(name: string | null) {
  const filepath = path.join(
    __dirname,
    `../../../../../src/app/files/${name}.mp3`
  );

  const drive = (await Auth()) as drive_v3.Drive;

  const sweetDreamsFolderID = '1ELrjadQU1A2PEHN4TfAO1QYPT2p5dNfK';

  const file = await drive.files.create({
    requestBody: {
      name: `${name}.mp3`,
      mimeType: 'audio/mpeg',
      parents: [sweetDreamsFolderID],
    },
    media: {
      mimeType: 'audio/mpeg',
      body: fs.createReadStream(filepath),
    },
  });

  return file;
}
