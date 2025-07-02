import { type NextRequest, NextResponse } from "next/server";

import {
	createInvitation,
	validateInvitation,
	markInvitationUsed,
	getAllInvitations,
	deleteInvitation,
} from "@/app/common/DB/invitationsCrud";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const action = searchParams.get("action");
	const token = searchParams.get("token");

	try {
		if (action === "create") {
			const invitation = await createInvitation();
			return NextResponse.json(invitation);
		}

		if (action === "validate") {
			if (!token) return badRequest("Missing token");
			const valid = await validateInvitation(token);
			return NextResponse.json({ valid });
		}

		if (action === "all") {
			const all = await getAllInvitations();
			return NextResponse.json(all);
		}

		return badRequest("Invalid action for GET");
	} catch (error) {
		return serverError("GET request failed", error);
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
