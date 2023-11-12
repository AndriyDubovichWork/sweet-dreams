import { File, useStore } from '@/app/store';
import { filesize } from 'filesize';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import style from './Audio.module.scss';
import { deleteDream, getDreams, renameDream } from '@/app/api/requests';
import Button from '@/app/components/Inputs/Button/Button';
import Processing from '../../Processing/Processing';
import Input from '@/app/components/Inputs/Input/Input';
import addProcessingProperty from '@/app/lib/addProcessingProperty';

function Audio({ file, id }: { file: File; id: number }) {
  const { name, size, id: fileId, webContentLink, processing } = file;
  const { files, setFiles, setApprove } = useStore();
  const [editable, setEditable] = useState(false);
  const [localName, setLocalName] = useState(name);

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
            <Button
              disabled={processing}
              onClick={() => {
                setFiles(addProcessingProperty(files, id, true));
                renameDream(fileId, localName).then(() => {
                  setEditable(!editable);
                  getDreams().then(({ files }) => {
                    setFiles(files);
                    setFiles(addProcessingProperty(files, id, false));
                  });
                });
              }}
            >
              rename
            </Button>
          </>
        ) : (
          <>
            {name}
            <p>{filesize(size)}</p>
            <Button onClick={() => setEditable(!editable)}>edit</Button>
          </>
        )}
        <Button
          disabled={processing}
          onClick={() =>
            setApprove({
              approve: 'are you shure you want to delete ' + name,
              approveCallback: () => {
                deleteDream(fileId).then(() => {
                  getDreams().then(({ files }) => {
                    setFiles(files);
                  });
                });
                setFiles(addProcessingProperty(files, id, true));
              },
            })
          }
        >
          <AiOutlineDelete className={style.trashIcon} size={30} />
        </Button>
      </>
    </Processing>
  );
}

export default Audio;
