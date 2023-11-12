import Input from '@/app/components/Inputs/Input/Input';
import Processing from '../../Processing/Processing';
import { useState } from 'react';
import { File } from '@/app/store';
import Button from '@/app/components/Inputs/Button/Button';
import { renameDream } from '@/app/api/requests';
import { filesize } from 'filesize';

export default function EditableAudio({
  file,
  close,
}: {
  file: File;
  close: () => void;
}) {
  const { name, size, id: fileId, webContentLink, deleting } = file;
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
        <Button onClick={close}>end editing</Button>
      </>
    </Processing>
  );
}
