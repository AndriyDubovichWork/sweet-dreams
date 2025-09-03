import { deleteDream, renameDream } from '@/app/api/requests';
import { useEffect, useState } from 'react';
import useUpdateDreams from '../../../common/hooks/useUpdateDreams';
import divideFullName from '@/app/common/utils/divideFullName';
import { useSavedDreamsStore } from '../store/useSavedDreamsStore';
import { useApproveActionStore } from '@/app/common/hooks/useApproveActionStore';
import { useDeleteFileStore } from '../store/useDeleteFileStore';
import addProcessingProperty from '../utils/addProcessingProperty';
import { EditAudioData } from '../../../common/hooks/types/EditAudioData';
import rename from '../utils/rename';
import stringDateFormatter from '../../../common/utils/stringDateFormatter';

export default function useEditAudioData({ file, renderId }: EditAudioData) {
  const { name: fullName, file_id, created_time } = file;

  const { date, name } = divideFullName(fullName);

  const { files, setFiles } = useSavedDreamsStore();
  const updateDreams = useUpdateDreams();
  const { setApprove } = useApproveActionStore();

  const { setDeletingFileName } = useDeleteFileStore();

  const [editable, setEditable] = useState(false);
  const [localName, setLocalName] = useState(name);
  const [isPrivate, setIsprivate] = useState(name.includes('/private/'));
  const renameFile = () => {
    setApprove({
      approve: `are you sure you want to change name from "${name}" to "${localName}"`,
      type: 'rename',
      approveCallback: () => {
        setFiles(addProcessingProperty(files, renderId, true));
        const fullLocalName = `${
          isPrivate
            ? localName + '/private/'
            : localName.replaceAll('/private/', '')
        } ${stringDateFormatter(created_time as string)}`;

        renameDream(file_id, fullLocalName).then(() => {
          setEditable(false);
          updateDreams({ successfullyMessage: 'renamed successfully' }).then(
            () => {
              rename(
                addProcessingProperty(files, renderId, false),
                renderId,
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
        deleteDream(file_id).then(() => {
          updateDreams({ successfullyMessage: 'deleted successfully' });
        });

        setFiles(addProcessingProperty(files, renderId, true));
      },
    });
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setLocalName(
      isPrivate
        ? localName.replaceAll('/private/', '') + '/private/'
        : localName.replaceAll('/private/', '')
    );
  }, [isPrivate, setLocalName]);
  return {
    deleteFile,
    renameFile,
    editable,
    setEditable,
    localName,
    setLocalName,
    date,
    name,
    isPrivate,
    setIsprivate,
  };
}
