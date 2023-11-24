import { drive_v3 } from '@googleapis/drive';
import Auth from './Auth';
import { OrderByValues } from '@/app/types/store/savedDreamsStore';

export default async function searchFileByName(
  orderBy: OrderByValues,
  name: string
) {
  const drive = (await Auth()) as drive_v3.Drive;

  return await drive.files.list({
    q: `'${process.env.FOLDER_ID}' in parents and name contains '${name}'`,
    fields: 'files(id, name, size,webContentLink,createdTime)',
    orderBy,
  });
}
