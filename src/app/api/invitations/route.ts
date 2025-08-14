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

function badRequest(message: string) {
	return NextResponse.json({ success: false, error: message }, { status: 400 });
}
