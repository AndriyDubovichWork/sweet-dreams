import axios from 'axios';
export async function postDream(blob: Blob) {
  let formData = new FormData();
  let fileName = `hello.mp3`;

  // let file = new File([blob], fileName, { type: blob.type });
  formData.append('file', blob, fileName);

  const res = await axios.put(`http://localhost:3000/api/dream`, formData, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
  return res;
}
