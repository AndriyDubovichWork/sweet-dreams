import { File } from '../../../common/store/types/savedDreamsStore';

export default function rename(files: File[], id: number, name: string) {
  return files.map((file, localIdx) =>
    localIdx === id ? { ...file, name } : file
  );
}
