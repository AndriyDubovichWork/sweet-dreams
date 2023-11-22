import { File } from '../store/useSavedDreamsStore';

export default function addProcessingProperty(
  files: File[],
  id: number,
  isProcessing: boolean
) {
  return files.map((file, localIdx) =>
    localIdx === id ? { ...file, processing: isProcessing } : file
  );
}
