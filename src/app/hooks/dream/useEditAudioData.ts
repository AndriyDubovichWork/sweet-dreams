import { deleteDream, renameDream } from '@/app/api/requests';
import { useApproveActionStore } from '@/app/store/dream/Shared/useApproveActionStore';
import { useSavedDreamsStore } from '@/app/store/dream/list/useSavedDreamsStore';
import { EditAudioData } from '@/app/types/hooks/dream/EditAudioData';
import divideFullName from '@/app/utils/dream/Shared/divideFullName';
import stringDateFormater from '@/app/utils/dream/Shared/stringDateFormater';
import addProcessingProperty from '@/app/utils/dream/list/addProcessingProperty';
import rename from '@/app/utils/dream/list/rename';
import { useState } from 'react';
import useUpdateDreams from './useUpdateDreams';
import { useDeleteFileStore } from '@/app/store/dream/list/useDeleteFileStore';

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
      approve: `are you sure you want to rename "${name}" to "${localName}"`,
      type: 'rename',
      approveCallback: () => {
        setFiles(addProcessingProperty(files, id, true));
        const fullLocalName = `${localName} ${stringDateFormater(createdTime)}`;
        renameDream(fileId, fullLocalName).then(() => {
          setEditable(false);
          updateDreams().then(() => {
            rename(addProcessingProperty(files, id, false), id, fullLocalName);
          });
        });
      },
    });
  };

  const deleteFile = () => {
    setDeletingFileName(name);
    setApprove({
      approve: `to delete ${name} type "${name}" in following input`,
      type: 'deletion',
      approveCallback: () => {
        deleteDream(fileId).then(() => {
          updateDreams();
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
