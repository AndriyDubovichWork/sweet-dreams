import { loadingStatus } from '@/app/enums/loadingStatus';

export type loadingStateStore = {
  status: loadingStatus;
  setStatus: (status: loadingStatus) => void;
};
