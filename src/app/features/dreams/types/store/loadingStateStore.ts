import { loadingStatus } from '../../../../types/Shared/loadingStatus';

export type loadingStateStore = {
  status: loadingStatus;
  setStatus: (status: loadingStatus) => void;
  message: string;
  setMessage: (message: string) => void;
};
