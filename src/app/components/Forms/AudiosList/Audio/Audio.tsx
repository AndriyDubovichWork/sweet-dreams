import { filesize } from 'filesize';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import style from './Audio.module.scss';
import { deleteDream, renameDream } from '@/app/api/requests';
import Button from '@/app/components/Inputs/Button/Button';
import Processing from '../../Processing/Processing';
import Input from '@/app/components/Inputs/Input/Input';
import addProcessingProperty from '@/app/lib/addProcessingProperty';
import { File, useSavedDreamsStore } from '@/app/store/useSavedDreamsStore';
import { useApproveAcrtionStore } from '@/app/store/useApproveAcrtionStore';
import { useSearchStore } from '@/app/store/useSearchStore';
import useUpdateDreams from '@/app/hooks/useUpdateDreams';
import EditAudio from '@/app/components/Inputs/EditAudio/EditAudio';

function Audio({ file, id }: { file: File; id: number }) {
  const { name, id: fileId, webContentLink, processing } = file;
  const { setApprove } = useApproveAcrtionStore();

  const { files, setFiles } = useSavedDreamsStore();

  const updateDreams = useUpdateDreams();

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

  return (
    <Processing isProcessing={file.processing}>
      <tr>
        <td>
          <audio controls src={webContentLink} />
        </td>
        <EditAudio file={file} id={id} />
        <td>
          <Button disabled={processing} onClick={deleteFile}>
            <AiOutlineDelete className={style.trashIcon} size={30} />
          </Button>
        </td>
      </tr>
    </Processing>
  );
}

export default Audio;
