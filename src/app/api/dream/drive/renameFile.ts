import { drive_v3 } from '@googleapis/drive';
import Auth from './Auth';

export default async function renameFile(fileId: string, newName: string) {
  const drive = (await Auth()) as drive_v3.Drive;
  const requestBody = { name: newName };

  return await drive.files.update({
    fileId,
    requestBody,
  });
}
