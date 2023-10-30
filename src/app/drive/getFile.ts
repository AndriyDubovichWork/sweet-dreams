import { drive, drive_v3 } from '@googleapis/drive';
import Auth from './Auth';

export default async function getFile() {
  const drive = (await Auth()) as drive_v3.Drive;

  const driveFile = await drive.files.list({
    // q: `'1jzbWlxavtZ1pc-mVQ2on4dzShRwvHgTc' in parents`,
    // pageSize: 100,
    fields: 'files(id, name)',
  });
  // if (driveFile.data.files) {
  //   driveFile.data.files.map(({ id }) => {
  //     drive.files.delete({
  //       fileId: id as string,
  //     });
  //   });
  // }
  return driveFile;
}
