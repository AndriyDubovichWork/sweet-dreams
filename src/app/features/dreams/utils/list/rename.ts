import { File } from '../../types/store/savedDreamsStore';

export default function rename(files: File[], id: number, name: string) {
  return files.map((file, localIdx) =>
    localIdx === id ? { ...file, name } : file
  );
}
