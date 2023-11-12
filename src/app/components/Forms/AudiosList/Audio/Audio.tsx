import { filesize } from 'filesize';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import style from './Audio.module.scss';
import { deleteDream, getDreams, renameDream } from '@/app/api/requests';
import Button from '@/app/components/Inputs/Button/Button';
import Processing from '../../Processing/Processing';
import Input from '@/app/components/Inputs/Input/Input';
import addProcessingProperty from '@/app/lib/addProcessingProperty';
import { File, useSavedDreamsStore } from '@/app/store/useSavedDreamsStore';
import { useApproveAcrtionStore } from '@/app/store/useApproveAcrtionStore';

function Audio({ file, id }: { file: File; id: number }) {
  const { name, size, id: fileId, webContentLink, processing } = file;
  const { setApprove } = useApproveAcrtionStore();

  const { files, setFiles, sortBy, sortById, isSortByReversed } =
    useSavedDreamsStore();

  const [editable, setEditable] = useState(false);
  const [localName, setLocalName] = useState(name);

  const renameFile = () => {
    setFiles(addProcessingProperty(files, id, true));
    renameDream(fileId, localName).then(() => {
      setEditable(!editable);
      getDreams(sortBy[sortById].value, isSortByReversed).then(({ files }) => {
        setFiles(files);
        setFiles(addProcessingProperty(files, id, false));
      });
    });
  };
  const deleteFile = () =>
    setApprove({
      approve: 'are you shure you want to delete ' + name,
      approveCallback: () => {
        deleteDream(fileId).then(() => {
          getDreams(sortBy[sortById].value, isSortByReversed).then(
            ({ files }) => {
              setFiles(files);
            }
          );
        });
        setFiles(addProcessingProperty(files, id, true));
      },
    });

  return (
    <Processing isProcessing={file.processing}>
      <>
        <audio controls src={webContentLink} />
        {editable ? (
          <>
            <Input
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
            />
            <p>{filesize(size)}</p>
            <Button disabled={processing} onClick={renameFile}>
              rename
            </Button>
          </>
        ) : (
          <>
            {name}
            <p>{filesize(size)}</p>
            <Button
              disabled={processing}
              onClick={() => setEditable(!editable)}
            >
              edit
            </Button>
          </>
        )}
        <Button disabled={processing} onClick={deleteFile}>
          <AiOutlineDelete className={style.trashIcon} size={30} />
        </Button>
      </>
    </Processing>
  );
}

export default Audio;
