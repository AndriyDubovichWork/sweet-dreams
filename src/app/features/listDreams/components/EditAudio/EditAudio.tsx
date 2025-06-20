import { filesize } from 'filesize';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import { MdEdit, MdOutlineCancel } from 'react-icons/md';
import { useEffect } from 'react';
import { EditAudioProps } from '@/app/features/listDreams/components/types/EditAudio';
import useEditAudioData from '../../hooks/useEditAudioData';
import Input from '@/app/common/components/ui/Input/Input';
import stringDateFormatter from '@/app/common/utils/stringDateFormatter';
import ButtonIcon from '@/app/common/components/ui/ButtonIcon/ButtonIcon';
import AcessControll from '@/app/common/hocs/AcessControll/AcessControll';

function EditAudio({ file, id }: EditAudioProps) {
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
    isPrivate,
    setIsprivate,
  } = useEditAudioData({ file, id });
  if (editable) {
    return (
      <>
        <td>
          <Input
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
          />
          <Input
            type='checkbox'
            checked={isPrivate}
            onChange={() => {
              setIsprivate(!isPrivate);
            }}
          />
        </td>

        <td>{filesize(size)}</td>
        <td>{date ? date : stringDateFormatter(createdTime)}</td>

        <td>
          <ButtonIcon
            disabled={processing || localName === name}
            onClick={renameFile}
          >
            <FaSave />
          </ButtonIcon>
        </td>

        <td>
          <ButtonIcon
            disabled={processing}
            onClick={() => {
              setEditable(false);
              setLocalName(name);
            }}
          >
            <MdOutlineCancel size={30} />
          </ButtonIcon>
        </td>
      </>
    );
  } else {
    return (
      <>
        <td>{isPrivate ? name.replaceAll('/private/', '') : name}</td>
        <td>
          <iframe src={file.playableurl} height='50' allow='autoplay'></iframe>
        </td>
        <td>{filesize(size)}</td>
        <td>{date ? date : stringDateFormatter(createdTime)}</td>
        <AcessControll>
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
        </AcessControll>
      </>
    );
  }
}

export default EditAudio;
