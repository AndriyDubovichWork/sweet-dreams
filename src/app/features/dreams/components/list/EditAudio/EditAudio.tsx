import { filesize } from 'filesize';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import { MdEdit, MdOutlineCancel } from 'react-icons/md';
import { File } from '@/app/features/dreams/types/store/savedDreamsStore';
import useEditAudioData from '../../../hooks/useEditAudioData';
import Input from '@/app/components/Input/Input';
import stringDateFormatter from '@/app/utils/stringDateFormatter';
import ButtonIcon from '@/app/components/ButtonIcon/ButtonIcon';
import { EditAudioProps } from '../../../types/components/list/EditAudio';
import AcessControll from '@/app/HOCs/AcessControll/AcessControll';

function EditAudio({ file, id, isPrivate }: EditAudioProps) {
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
