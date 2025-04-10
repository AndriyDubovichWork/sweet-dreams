import { drive, auth } from '@googleapis/drive';

export default async function Auth() {
  const key = JSON.parse(process.env.GOOGLE_PK_STRING as string);

  return new Promise((resolve, reject) => {
    const jwtClient = new auth.JWT({
      keyFile: key,
      email: key.client_email,
      key: key.private_key,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          drive({
            version: 'v3',
            auth: jwtClient,
          })
        );
      }
    });
  });
}
