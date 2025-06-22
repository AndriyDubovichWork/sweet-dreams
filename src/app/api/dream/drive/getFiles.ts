import { drive_v3 } from '@googleapis/drive';
import Auth from './Auth';
import { OrderByValues } from '@/app/common/store/types/savedDreamsStore';

export default async function getFiles(orderBy: OrderByValues, pageSize = 10) {
  const drive = (await Auth()) as drive_v3.Drive;

  const params = {
    pageSize,
    q: `'${process.env.FOLDER_ID}' in parents`,
    fields: 'files(id, name, size, webContentLink, createdTime, mimeType)',
    orderBy,
  };

  return drive.files.list(params);
}
