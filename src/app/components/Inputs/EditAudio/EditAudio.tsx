import { renameDream } from '@/app/api/requests';
import useUpdateDreams from '@/app/hooks/useUpdateDreams';
import addProcessingProperty from '@/app/lib/addProcessingProperty';
import { useApproveAcrtionStore } from '@/app/store/useApproveAcrtionStore';
import { File, useSavedDreamsStore } from '@/app/store/useSavedDreamsStore';
import { filesize } from 'filesize';
import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import stringDateFormater from '@/app/lib/stringDateFormater';

function EditAudio({ file, id }: { file: File; id: number }) {
  const {
    name,
    size,
    id: fileId,
    webContentLink,
    processing,
    createdTime,
  } = file;

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
          <Button disabled={processing} onClick={() => setEditable(false)}>
            cancel
          </Button>
          <Button disabled={processing} onClick={renameFile}>
            rename
          </Button>
        </td>
      </>
    );
  } else {
    return (
      <>
        <td>{name}</td>
        <td>{filesize(size)}</td>
        <td>{stringDateFormater(createdTime)}</td>

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
