import { drive_v3 } from '@googleapis/drive';
import Auth from './Auth';
import { OrderByValues } from '@/app/features/dreams/types/store/savedDreamsStore';

export default async function getFiles(
  orderBy: OrderByValues,
  pageToken: string,
  pageSize = 10
) {
  const drive = (await Auth()) as drive_v3.Drive;

  const params = {
    ...(pageToken && { pageToken }),
    pageSize,
    q: `'${process.env.FOLDER_ID}' in parents`,
    fields:
      'files(id, name, size, webContentLink, createdTime, mimeType) , nextPageToken',
    orderBy,
  };

  return drive.files.list(params);
}
