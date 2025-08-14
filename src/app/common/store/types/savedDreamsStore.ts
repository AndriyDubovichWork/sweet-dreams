export type File = {
	id: string;
	name: string;
	created_time: string;
	modified_time: string;
	last_updated_time: string;
	file_id: string;
	size: number;
	web_content_link: string;
	playable_url: string;
	is_private: boolean;
};

export type OrderByDirection = "ASC" | "DESC";
export type OrderByValues = "name" | "created_time" | "modified_time";
export type OrderByNames = "created time" | "name" | "modified time";

export type SortBy = {
	value: OrderByValues;
	name: OrderByNames;
};

export type SavedDreamsStore = {
	files: File[];
	setFiles: (files: File[]) => void;

	sortBy: SortBy[];
	sortById: number;
	setSortById: (sortById: number) => void;

	isSortByReversed: boolean;
	setIsSortByReversed: (isSortByReversed: boolean) => void;
};
