import { drive_v3 } from '@googleapis/drive';
import Auth from './Auth';
import { OrderByValues } from '@/app/store/useSavedDreamsStore';

export default async function getFiles(orderBy: OrderByValues) {
  const drive = (await Auth()) as drive_v3.Drive;

  return await drive.files.list({
    q: `'${process.env.FOLDER_ID}' in parents`,
    fields: 'files(id, name, size,webContentLink)',
    orderBy,
  });
}
