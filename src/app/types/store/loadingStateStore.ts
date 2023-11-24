export type loadingStatus = 'pending' | 'fullfiled' | 'error';

export type loadingStateStore = {
  status: loadingStatus;
  setStatus: (status: loadingStatus) => void;
};
