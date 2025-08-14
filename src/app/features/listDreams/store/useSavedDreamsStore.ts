import { create } from "zustand";
import {
	SavedDreamsStore,
	SortBy,
} from "../../../common/store/types/savedDreamsStore";

const sortBy: SortBy[] = [
	{
		name: "name",
		value: "name",
	},
	{
		name: "modified time",
		value: "modified_time",
	},
	{
		name: "created time",
		value: "created_time",
	},
];

export const useSavedDreamsStore = create<SavedDreamsStore>((set) => ({
	files: [],
	setFiles: (files) =>
		set((state) => ({
			...state,
			files,
		})),

	sortBy,

	sortById: 1,
	setSortById: (sortById) =>
		set((state) => ({
			...state,
			sortById,
		})),

	isSortByReversed: true,
	setIsSortByReversed: (isSortByReversed) =>
		set((state) => ({
			...state,
			isSortByReversed,
		})),
}));
