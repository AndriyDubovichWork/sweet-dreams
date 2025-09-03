import { drive_v3 } from '@googleapis/drive';
import { Readable } from 'stream';
import Auth from './Auth';
import { createDream } from '@/app/common/DB/dreamCrud';
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
    modified_time: new Date(),
    file_id: responseFile.id,
    size: blob.size,
    name: responseFile.name,
    created_time: new Date(),
    last_updated_time: new Date(),
    is_private: isPrivate,
    playable_url: `https://drive.google.com/file/d/${responseFile.id}/preview`,
    web_content_link: `https://drive.google.com/uc?id=${responseFile.id}&export=download`,
  });
  return createdFile;
}
