import { drive_v3 } from '@googleapis/drive';
import Auth from './Auth';

export default async function getFiles() {
  const drive = (await Auth()) as drive_v3.Drive;

  return await drive.files.list({
    q: `'${process.env.FOLDER_ID}' in parents`,
    fields: 'files(id, name, size,webContentLink)',
  });
}
