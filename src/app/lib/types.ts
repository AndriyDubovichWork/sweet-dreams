export type UserRole = 'admin' | 'super_user' | 'regular_user';

export interface User {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  status: UserRole;
  created_at: Date;
  last_login: Date | null;
  is_active: boolean;
}

export interface File {
  file_id: number;
  unique_id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  file_type: string | null;
  created_by: number;
  is_private: boolean;
  allowed_users: number[] | null;
  created_at: Date;
  last_modified: Date;
  last_viewed: Date | null;
  view_count: number;
  last_viewed_by: number | null;
  properties: Record<string, any>;
}

export interface CreateFileParams {
  file_name: string;
  file_url: string;
  file_size: number;
  file_type?: string;
  created_by: number;
  is_private?: boolean;
  allowed_users?: number[];
  properties?: Record<string, any>;
}

export interface UpdateFileParams {
  file_id: number;
  file_name?: string;
  file_url?: string;
  file_size?: number;
  file_type?: string | null;
  is_private?: boolean;
  allowed_users?: number[] | null;
  properties?: Record<string, any>;
}
