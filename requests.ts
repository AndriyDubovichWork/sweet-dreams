import axios from 'axios';

export async function postDream(path: string) {
  const res = await axios.post(`http://localhost:3000/api/dream?path=${path}`);
  return res.data.path;
}
