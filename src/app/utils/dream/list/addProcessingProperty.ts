import { File } from '../../../types/store/savedDreamsStore';

export default function addProcessingProperty(
  files: File[],
  id: number,
  isProcessing: boolean
) {
  return files.map((file, localIdx) =>
    localIdx === id ? { ...file, processing: isProcessing } : file
  );
}
