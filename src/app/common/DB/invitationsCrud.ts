import { neon } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);

// Create a new invitation
export async function createInvitation() {
	const token = uuidv4();

	try {
		const result = await sql`
      INSERT INTO invitations (token)
      VALUES (${token})
      RETURNING id, token
    `;

		if (!result || result.length === 0) {
			throw new Error("Failed to create invitation");
		}

		const invitationUrl = `${process.env.NEXTAUTH_URL}/register?token=${result[0].token}`;
		return {
			url: invitationUrl,
			id: result[0].id,
			token: result[0].token,
		};
	} catch (error) {
		console.error("Error creating invitation:", error);
		throw error;
	}
}

// Validate an invitation token
export async function validateInvitation(token: string) {
	try {
		const result = await sql`
      SELECT id, used
      FROM invitations
      WHERE token = ${token}
    `;

		if (result.length === 0) {
			return false;
		}

		const invitation = result[0];

		if (invitation.used) {
			return false;
		}

		return true;
	} catch (error) {
		console.error("Error validating invitation:", error);
		return false;
	}
}

// Mark an invitation as used
export async function markInvitationUsed(token: string) {
	try {
		const result = await sql`
      UPDATE invitations
      SET used = TRUE
      WHERE token = ${token}
      RETURNING id
    `;

		if (!result || result.length === 0) {
			throw new Error("Invitation not found or already used");
		}

		return { success: true, invitationId: result[0].id };
	} catch (error) {
		console.error("Error marking invitation as used:", error);
		throw error;
	}
}

// Get all invitations (for admin purposes)
export async function getAllInvitations() {
	try {
		return await sql`
      SELECT id, token, used
      FROM invitations
      ORDER BY id DESC
    `;
	} catch (error) {
		console.error("Error fetching invitations:", error);
		throw error;
	}
}

// Delete an invitation
export async function deleteInvitation(token: string) {
	try {
		const result = await sql`
      DELETE FROM invitations
      WHERE token = ${token}
      RETURNING id
    `;

		if (!result || result.length === 0) {
			throw new Error("Invitation not found");
		}

		return { success: true, deletedId: result[0].id };
	} catch (error) {
		console.error("Error deleting invitation:", error);
		throw error;
	}
}
