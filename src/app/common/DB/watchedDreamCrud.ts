import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { getUserById } from "./userCrud";

const sql = neon(process.env.DATABASE_URL!);

export async function addDreamToWatched(userId: number, dreamId: string) {
	try {
		// Check if the user exists
		const user = await getUserById(userId);
		if (!user) throw new Error("User not found");

		// Check if the dream exists
		const dream = await sql`
      SELECT * FROM dreams WHERE file_id = ${dreamId}
    `;
		if (!dream[0]) throw new Error("Dream not found");

		// Insert into watchedDreams table
		const result = await sql`
      INSERT INTO watched_dreams (user_id, dream_id)
      VALUES (${userId}, ${dreamId})
      ON CONFLICT (user_id, dream_id) DO NOTHING
      RETURNING *;
    `;

		return result[0] || { message: "Already watched" };
	} catch (error) {
		console.error("Error adding dream to watched list:", error);
		throw error;
	}
}

export async function getWatchedDreams(userId: number) {
	try {
		const result = await sql`
      SELECT * FROM watched_dreams
	  WHERE user_id=${userId}
		`;
		return result;
	} catch (error) {
		console.error("Error getting watched dreams:", error);
		throw error;
	}
}
