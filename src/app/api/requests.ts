import axios from 'axios';
import { OrderByValues } from '../store/useSavedDreamsStore';

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
  isSortByReversed: boolean
) {
  const res = await axios.get(`http://localhost:3000/api/dream`, {
    params: {
      sortBy: isSortByReversed ? sortBy + ' desc' : sortBy,
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
