export type UserStatus = 'admin' | 'superUser' | 'user';

export interface User {
  id: bigint | number;
  status: UserStatus;
  email: string;
  dreamsWatched: string;
  created_at: Date;
  last_login: Date | null;
  is_active: boolean;
}

export interface Dream {
  id: bigint | number;
  name: string;
  createdTime: Date;
  lastUpdatedTime: Date;
  fileId: string;
  size: number;
  webContentLink: string;
  playableUrl: string;
  isPrivate: boolean;
}
