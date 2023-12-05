import { filesize } from 'filesize';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import style from './Audio.module.scss';
import { deleteDream, renameDream } from '@/app/api/requests';
import Button from '@/app/components/Shared/Button/Button';
import Input from '@/app/components/Shared/Input/Input';
import addProcessingProperty from '@/app/utils/dream/list/addProcessingProperty';
import { useSavedDreamsStore } from '@/app/store/dream/list/useSavedDreamsStore';
import { useApproveAcrtionStore } from '@/app/store/dream/Shared/useApproveAcrtionStore';
import { useSearchStore } from '@/app/store/dream/list/useSearchStore';
import useUpdateDreams from '@/app/hooks/dream/useUpdateDreams';
import EditAudio from '@/app/components/dream/list/EditAudio/EditAudio';
import Processing from '@/app/HOCs/Shared/Processing/Processing';
import { File } from '@/app/types/store/savedDreamsStore';
import divideFullName from '@/app/utils/dream/Shared/divideFullName';

function Audio({ file, id }: { file: File; id: number }) {
  const { name, id: fileId, webContentLink, processing } = file;

  return (
    <Processing isProcessing={file.processing}>
      <tr className={file.processing ? style.processing : ''}>
        <td>
          <audio controls src={webContentLink} />
        </td>
        <EditAudio file={file} id={id} />
      </tr>
    </Processing>
  );
}

export default Audio;
