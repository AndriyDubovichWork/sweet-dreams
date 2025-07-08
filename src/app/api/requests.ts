import axios from "axios";
import { OrderByValues } from "../common/store/types/savedDreamsStore";

export async function postDream(
	blob: Blob,
	fileName: string,
	isPrivate: boolean,
) {
	let formData = new FormData();

	formData.append(
		"file",
		blob,
		fileName.replaceAll("/", "tokenforslashwithoutitwillcutastring"),
	);

	const res = await axios.put(`/api/dream`, formData, {
		headers: {
			"Content-Type": `multipart/form-data`,
		},
		params: {
			isPrivate,
		},
	});
	return res;
}
export async function getDreams(
	sortBy: OrderByValues,
	isSortByReversed: boolean,
	name?: string,
) {
	const res: any = await axios.get(`/api/dream`, {
		params: {
			sortBy,
			isSortByReversed,
			name,
		},
	});
	return res.data.res;
}
export async function deleteDream(fileId: string) {
	const res = await axios.delete(`/api/dream`, {
		params: {
			fileId,
		},
	});

	return res.data.res;
}
export async function renameDream(fileId: string, newName: string) {
	const res = await axios.patch(`/api/dream`, null, {
		params: {
			fileId,
			newName,
		},
	});
	return res.data.res;
}

// Create a new invitation
export async function createInvitationRequest() {
	const res = await axios.get("/api/invitations", {
		params: {
			action: "create",
		},
	});
	return res.data;
}

// Validate an invitation token
export async function validateInvitationRequest(
	token: string | undefined | null,
) {
	if (!token) return false;
	const res = await axios.get("/api/invitations", {
		params: {
			action: "validate",
			token,
		},
	});
	return res.data.valid; // boolean
}

// Mark an invitation as used
export async function useInvitationRequest(token: string) {
	const res = await axios.post("/api/invitations", null, {
		params: {
			action: "use",
			token,
		},
	});
	return res.data; // { success: true, invitationId: ... }
}

// Delete an invitation
export async function deleteInvitationRequest(token: string) {
	const res = await axios.delete("/api/invitations", {
		params: {
			action: "delete",
			token,
		},
	});
	return res.data; // { success: true, deletedId: ... }
}

// Get all invitations (admin)
export async function getAllInvitationsRequest() {
	const res = await axios.get("/api/invitations", {
		params: {
			action: "all",
		},
	});
	return res.data; // [{ id, token, used }, ...]
}
