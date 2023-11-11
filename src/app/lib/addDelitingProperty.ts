import { File } from '../store';

export default function addDelitingProperty(files: File[], id: number) {
  return files.map((file, localIdx) =>
    localIdx === id ? { ...file, deleting: true } : file
  );
}
