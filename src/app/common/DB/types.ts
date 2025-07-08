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
export interface CreateUser {
  status: UserStatus;
  email: string;
}
export interface Dream {
  id?: number;
  name: string;
  createdTime: Date;
  modifiedTime: Date;
  lastUpdatedTime: Date;
  fileId: string;
  size: number;
  webContentLink: string;
  playableUrl: string;
  isPrivate: boolean;
}
