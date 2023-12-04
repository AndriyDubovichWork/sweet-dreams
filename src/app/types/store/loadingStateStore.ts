import { loadingStatus } from '../Shared/loadingStatus';

export type loadingStateStore = {
  status: loadingStatus;
  setStatus: (status: loadingStatus) => void;
};
