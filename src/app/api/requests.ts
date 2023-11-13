import axios from 'axios';
import { OrderByValues } from '../store/useSavedDreamsStore';
import createFullSortBy from '../lib/createFullSortBy';

export async function postDream(blob: Blob, fileName: string) {
  let formData = new FormData();

  formData.append(
    'file',
    blob,
    fileName.replaceAll('/', 'tokenforslashwithoutitwillcutastring')
  );

  const res = await axios.put(`http://localhost:3000/api/dream`, formData, {
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
  const res = await axios.get(`http://localhost:3000/api/dream`, {
    params: {
      sortBy: createFullSortBy(sortBy, isSortByReversed),
      name,
    },
  });

  return res.data.res;
}
export async function deleteDream(fileId: string) {
  const res = await axios.delete(`http://localhost:3000/api/dream`, {
    params: {
      fileId,
    },
  });
  return res.data.res;
}
export async function renameDream(fileId: string, newName: string) {
  const res = await axios.patch(`http://localhost:3000/api/dream`, null, {
    params: {
      fileId,
      newName,
    },
  });
  return res.data.res;
}
