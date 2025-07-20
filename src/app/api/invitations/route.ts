// biome-ignore assist/source/organizeImports: <fuck it>
import { type NextRequest, NextResponse } from "next/server";

import {
	createInvitation,
	validateInvitation,
	markInvitationUsed,
	getAllInvitations,
	deleteInvitation,
	getAllUsedInvitations,
} from "@/app/common/DB/invitationsCrud";
import { createUser, getAllUsers } from "@/app/common/DB/userCrud";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const token = searchParams.get("token");
	const email = searchParams.get("email");
	if (!token) return badRequest("Missing token");
	if (!email) return badRequest("Missing email");

	const valid = await validateInvitation(token);
	// const invitaions = await getAllUsedInvitations();
	// const users = await getAllUsers();

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailRegex.test(email)) return badRequest("invalid email");

	// return NextResponse.json(invitaions);
	if (valid) {
		try {
			const user = await createUser({
				email,
				status: "user",
			}).then(() => {
				markInvitationUsed(token);
			});
			return NextResponse.json(user);
		} catch {
			return badRequest("couldnt create user");
		}
	} else {
		return badRequest("invalid token");
	}
}

// POST: use invitation
export async function POST(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const action = searchParams.get("action");
	const token = searchParams.get("token");

	if (action === "use") {
		if (!token) return badRequest("Missing token");

		try {
			const result = await markInvitationUsed(token);
			return NextResponse.json(result);
		} catch (error) {
			return serverError("Failed to mark invitation as used", error);
		}
	}

	return badRequest("Invalid action for POST");
}

// DELETE: delete invitation
export async function DELETE(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const action = searchParams.get("action");
	const token = searchParams.get("token");

	if (action === "delete") {
		if (!token) return badRequest("Missing token");

		try {
			const result = await deleteInvitation(token);
			return NextResponse.json(result);
		} catch (error) {
			return serverError("Failed to delete invitation", error);
		}
	}

	return badRequest("Invalid action for DELETE");
}

// Helpers
function badRequest(message: string) {
	return NextResponse.json({ success: false, error: message }, { status: 400 });
}

function serverError(message: string, error: unknown) {
	console.error(`${message}:`, error);
	return NextResponse.json({ success: false, error: message }, { status: 500 });
}
