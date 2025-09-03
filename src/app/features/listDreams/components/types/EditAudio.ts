import { File } from '../../../../common/store/types/savedDreamsStore';

export type EditAudioProps = {
  file: File & {
    processing: boolean;
  };
  renderId: number;
};
