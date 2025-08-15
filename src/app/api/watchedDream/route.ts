// biome-ignore assist/source/organizeImports: <fuck it>
import {
	getWatchedDreams,
} from "@/app/common/DB/watchedDreamCrud";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const userId = searchParams.get("userId");
	if (!userId) return badRequest("Missing userId");

	const watched = await getWatchedDreams(Number(userId));
	return NextResponse.json(watched);
}

function badRequest(message: string) {
	return NextResponse.json({ success: false, error: message }, { status: 400 });
}
