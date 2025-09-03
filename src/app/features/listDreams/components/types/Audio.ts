import { File } from '../../../../common/store/types/savedDreamsStore';

export type AudioProps = {
  file: File & {
    processing: boolean;
  };
  renderId: number;
};
