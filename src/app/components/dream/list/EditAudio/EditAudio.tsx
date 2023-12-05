import { deleteDream, renameDream } from '@/app/api/requests';
import useUpdateDreams from '@/app/hooks/dream/useUpdateDreams';
import addProcessingProperty from '@/app/utils/dream/list/addProcessingProperty';
import { useApproveAcrtionStore } from '@/app/store/dream/Shared/useApproveAcrtionStore';
import { useSavedDreamsStore } from '@/app/store/dream/list/useSavedDreamsStore';
import { filesize } from 'filesize';
import React, { useState } from 'react';
import Input from '../../../Shared/Input/Input';
import Button from '../../../Shared/Button/Button';
import stringDateFormater from '@/app/utils/dream/Shared/stringDateFormater';
import { File } from '@/app/types/store/savedDreamsStore';
import divideFullName from '@/app/utils/dream/Shared/divideFullName';
import { MdOutlineCancel } from 'react-icons/md';
import Centered from '@/app/HOCs/Shared/Centered/Centered';
import rename from '@/app/utils/dream/list/rename';
import { AiOutlineDelete } from 'react-icons/ai';
import style from './EditAudio.module.scss';
import { MdEdit } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';
import Icon from '@/app/components/Shared/Icon/Icon';
import ButtonIcon from '@/app/components/Shared/ButtonIcon/ButtonIcon';
import useEditAudioData from '@/app/hooks/dream/useEditAudioData';

function EditAudio({ file, id }: { file: File; id: number }) {
  const { size, processing, createdTime } = file;

  const {
    deleteFile,
    renameFile,
    editable,
    setEditable,
    localName,
    setLocalName,
    date,
    name,
  } = useEditAudioData({ file, id });

  if (editable) {
    return (
      <>
        <td>
          <Input
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
          />
        </td>
        <td>{filesize(size)}</td>
        <td>{date ? date : stringDateFormater(createdTime)}</td>

        <td>
          <ButtonIcon disabled={processing} onClick={renameFile}>
            <FaSave />
          </ButtonIcon>
        </td>
        <td>
          <ButtonIcon
            disabled={processing}
            onClick={() => {
              setEditable(false);
              setLocalName(name);
            }}>
            <MdOutlineCancel size={30} />
          </ButtonIcon>
        </td>
      </>
    );
  } else {
    return (
      <>
        <td>{name}</td>
        <td>{filesize(size)}</td>
        <td>{date ? date : stringDateFormater(createdTime)}</td>

        <td>
          <ButtonIcon disabled={processing} onClick={() => setEditable(true)}>
            <MdEdit />
          </ButtonIcon>
        </td>
        <td>
          <ButtonIcon disabled={processing} onClick={deleteFile}>
            <AiOutlineDelete />
          </ButtonIcon>
        </td>
      </>
    );
  }
}

export default EditAudio;
