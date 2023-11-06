import axios from 'axios';
import { useStore } from '../store';

export async function postDream(blob: Blob, fileName: string) {
  let formData = new FormData();

  formData.append('file', blob, fileName);

  const res = await axios.put(`http://localhost:3000/api/dream`, formData, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });

  return res;
}
export async function getDreams() {
  const res = await axios.get(`http://localhost:3000/api/dream`);

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
