export type UserStatus = "admin" | "super_user" | "user";

export interface User {
	id: bigint | number;
	status: UserStatus;
	email: string;
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
	created_time: Date;
	modified_time: Date;
	last_updated_time: Date;
	file_id: string;
	size: number;
	web_content_link: string;
	playable_url: string;
	is_private: boolean;
}
