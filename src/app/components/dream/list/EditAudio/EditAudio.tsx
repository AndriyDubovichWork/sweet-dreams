import ButtonIcon from '@/app/components/Shared/ButtonIcon/ButtonIcon';
import useEditAudioData from '@/app/hooks/dream/useEditAudioData';
import { File } from '@/app/types/store/savedDreamsStore';
import stringDateFormater from '@/app/utils/dream/Shared/stringDateFormater';
import { filesize } from 'filesize';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import { MdEdit, MdOutlineCancel } from 'react-icons/md';
import Input from '../../../Shared/Input/Input';

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
