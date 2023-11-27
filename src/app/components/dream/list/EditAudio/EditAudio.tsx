import { renameDream } from '@/app/api/requests';
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

function EditAudio({ file, id }: { file: File; id: number }) {
  const {
    name: fullName,
    size,
    id: fileId,
    webContentLink,
    processing,
    createdTime,
  } = file;
  const { date, name } = divideFullName(fullName);

  const [editable, setEditable] = useState(false);
  const [localName, setLocalName] = useState(name);

  const { files, setFiles } = useSavedDreamsStore();
  const updateDreams = useUpdateDreams();

  const renameFile = () => {
    setFiles(addProcessingProperty(files, id, true));
    renameDream(fileId, localName).then(() => {
      setEditable(!editable);
      updateDreams().then(() => {
        setFiles(addProcessingProperty(files, id, false));
      });
    });
  };

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
        <td>
          <Button disabled={processing} onClick={renameFile}>
            rename
          </Button>
        </td>
        <td>
          <Centered absolute={false}>
            <Button disabled={processing} onClick={() => setEditable(false)}>
              <MdOutlineCancel />
            </Button>
          </Centered>
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
          <Button disabled={processing} onClick={() => setEditable(!editable)}>
            edit
          </Button>
        </td>
      </>
    );
  }
}

export default EditAudio;
