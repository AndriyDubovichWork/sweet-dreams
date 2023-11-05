import { drive, auth } from '@googleapis/drive';

const key = require('../../../../../pk.json');

export default async function Auth() {
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
