import { drive_v3 } from '@googleapis/drive';
import Auth from './Auth';

export default async function deleteFile(id: string) {
  const drive = (await Auth()) as drive_v3.Drive;

  const driveFile = await drive.files.delete({
    fileId: id,
  });
  return driveFile;
}
