import { File, useStore } from '@/app/store';
import { filesize } from 'filesize';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import style from './Audio.module.scss';
import { deleteDream, getDreams, renameDream } from '@/app/api/requests';
import Button from '@/app/components/Inputs/Button/Button';
import addDelitingProperty from '@/app/lib/addDelitingProperty';
import Processing from '../../Processing/Processing';
import Input from '@/app/components/Inputs/Input/Input';

function Audio({ file, id }: { file: File; id: number }) {
  const { name, size, id: fileId, webContentLink, deleting } = file;
  const { files, setFiles, setApprove } = useStore();
  const [localName, setLocalName] = useState(name);

  return (
    <Processing isProcessing={file.deleting}>
      <>
        <audio controls src={webContentLink} />

        <Input
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
        />
        <Button onClick={() => renameDream(fileId, localName)}>rename</Button>
        <p>{filesize(size)}</p>
        <Button
          disabled={deleting}
          onClick={() =>
            setApprove({
              approve: 'are you shure you want to delete ' + name,
              approveCallback: () => {
                deleteDream(fileId).then(() => {
                  getDreams().then(({ files }) => {
                    setFiles(files);
                  });
                });
                setFiles(addDelitingProperty(files, id));
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
