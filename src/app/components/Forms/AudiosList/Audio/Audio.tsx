import { File, useStore } from '@/app/store';
import { filesize } from 'filesize';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import style from './Audio.module.scss';
import { deleteDream, getDreams } from '@/app/api/requests';
import Button from '@/app/components/Inputs/Button/Button';
import addDelitingProperty from '@/app/lib/addDelitingProperty';
import Processing from '../../Processing/Processing';
function Audio({ file, id }: { file: File; id: number }) {
  const { name, size, id: fileId, webContentLink, deleting } = file;
  const { files, setFiles, setApprove } = useStore();

  return (
    <Processing isProcessing={file.deleting}>
      <>
        <audio controls src={webContentLink} />

        <p>{name}</p>
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
