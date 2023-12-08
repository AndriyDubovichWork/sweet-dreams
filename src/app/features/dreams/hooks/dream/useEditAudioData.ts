import { deleteDream, renameDream } from '@/app/api/requests';
import { useState } from 'react';
import useUpdateDreams from './useUpdateDreams';
import divideFullName from '../../utils/dream/Shared/divideFullName';
import { useSavedDreamsStore } from '../../store/dream/list/useSavedDreamsStore';
import { useApproveActionStore } from '../../store/dream/Shared/useApproveActionStore';
import { EditAudioData } from '../../types/hooks/dream/EditAudioData';
import { useDeleteFileStore } from '../../store/dream/list/useDeleteFileStore';
import stringDateFormater from '../../utils/dream/Shared/stringDateFormater';
import addProcessingProperty from '../../utils/dream/list/addProcessingProperty';
import rename from '../../utils/dream/list/rename';

export default function useEditAudioData({ file, id }: EditAudioData) {
  const { name: fullName, id: fileId, createdTime } = file;

  const { date, name } = divideFullName(fullName);

  const { files, setFiles } = useSavedDreamsStore();
  const updateDreams = useUpdateDreams();
  const { setApprove } = useApproveActionStore();

  const { setDeletingFileName } = useDeleteFileStore();

  const [editable, setEditable] = useState(false);
  const [localName, setLocalName] = useState(name);

  const renameFile = () => {
    setApprove({
      approve: `are you sure you want to change name from "${name}" to "${localName}"`,
      type: 'rename',
      approveCallback: () => {
        setFiles(addProcessingProperty(files, id, true));
        const fullLocalName = `${localName} ${stringDateFormater(createdTime)}`;
        renameDream(fileId, fullLocalName).then(() => {
          setEditable(false);
          updateDreams({ successfullyMessage: 'renamed successfully' }).then(
            () => {
              rename(
                addProcessingProperty(files, id, false),
                id,
                fullLocalName
              );
            }
          );
        });
      },
    });
  };

  const deleteFile = () => {
    setDeletingFileName(name);
    setApprove({
      approve: `to delete dream type "${name}" in following input`,
      type: 'deletion',
      approveCallback: () => {
        deleteDream(fileId).then(() => {
          updateDreams({ successfullyMessage: 'deleted successfully' });
        });
        setFiles(addProcessingProperty(files, id, true));
      },
    });
  };
  return {
    deleteFile,
    renameFile,
    editable,
    setEditable,
    localName,
    setLocalName,
    date,
    name,
  };
}
