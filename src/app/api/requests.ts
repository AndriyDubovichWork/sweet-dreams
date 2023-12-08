import axios from 'axios';
import { OrderByValues } from '../features/dreams/types/store/savedDreamsStore';
import createFullSortBy from '../features/dreams/utils/dream/list/createFullSortBy';

export async function postDream(blob: Blob, fileName: string) {
  let formData = new FormData();

  formData.append(
    'file',
    blob,
    fileName.replaceAll('/', 'tokenforslashwithoutitwillcutastring')
  );

  const res = await axios.put(`/api/dream`, formData, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
  return res;
}
export async function getDreams(
  sortBy: OrderByValues,
  isSortByReversed: boolean,
  name?: string
) {
  const res: any = await axios.get(`/api/dream`, {
    params: {
      sortBy: createFullSortBy(sortBy, isSortByReversed),
      name,
    },
  });

  return res.data.res;
}
export async function deleteDream(fileId: string) {
  const res = await axios.delete(`/api/dream`, {
    params: {
      fileId,
    },
  });
  return res.data.res;
}
export async function renameDream(fileId: string, newName: string) {
  const res = await axios.patch(`/api/dream`, null, {
    params: {
      fileId,
      newName,
    },
  });
  return res.data.res;
}
