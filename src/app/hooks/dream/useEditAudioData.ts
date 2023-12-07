import { deleteDream, renameDream } from '@/app/api/requests';
import { useApproveAcrtionStore } from '@/app/store/dream/Shared/useApproveAcrtionStore';
import { useSavedDreamsStore } from '@/app/store/dream/list/useSavedDreamsStore';
import { EditAudioData } from '@/app/types/hooks/dream/EditAudioData';
import divideFullName from '@/app/utils/dream/Shared/divideFullName';
import stringDateFormater from '@/app/utils/dream/Shared/stringDateFormater';
import addProcessingProperty from '@/app/utils/dream/list/addProcessingProperty';
import rename from '@/app/utils/dream/list/rename';
import { useState } from 'react';
import useUpdateDreams from './useUpdateDreams';

export default function useEditAudioData({ file, id }: EditAudioData) {
  const { name: fullName, id: fileId, createdTime } = file;

  const { date, name } = divideFullName(fullName);

  const { files, setFiles } = useSavedDreamsStore();
  const updateDreams = useUpdateDreams();
  const { setApprove } = useApproveAcrtionStore();

  const [editable, setEditable] = useState(false);
  const [localName, setLocalName] = useState(name);

  const renameFile = () => {
    setFiles(addProcessingProperty(files, id, true));
    const fullLocalName = `${localName} ${stringDateFormater(createdTime)}`;
    renameDream(fileId, fullLocalName).then(() => {
      setEditable(false);
      updateDreams().then(() => {
        rename(addProcessingProperty(files, id, false), id, fullLocalName);
      });
    });
  };

  const deleteFile = () =>
    setApprove({
      approve: 'are you shure you want to delete ' + name,
      approveCallback: () => {
        deleteDream(fileId).then(() => {
          updateDreams();
        });
        setFiles(addProcessingProperty(files, id, true));
      },
    });

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
