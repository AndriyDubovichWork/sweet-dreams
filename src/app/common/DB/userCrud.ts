import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import type { CreateUser, User, UserStatus } from "./types";

// biome-ignore lint/style/noNonNullAssertion: <env linking>
const sql = neon(process.env.DATABASE_URL!);

export async function createUser(userData: CreateUser) {
	try {
		const result = await sql`
      INSERT INTO users (
        status, 
        email
      )
      VALUES (
        ${userData.status || "user"},
        ${userData.email}
		        )
      RETURNING *;
    `;
		return result[0];
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
}

export async function getUserById(userId: number) {
	try {
		const result = await sql`
      SELECT * FROM users 
      WHERE id = ${userId}
    `;
		return result[0];
	} catch (error) {
		console.error("Error getting user:", error);
		throw error;
	}
}

export async function getUserByEmail(email: string) {
	try {
		const result = await sql`
      SELECT * FROM users 
      WHERE email = ${email}
    `;
		return result[0];
	} catch (error) {
		console.error("Error getting user by email:", error);
		throw error;
	}
}

export async function getAllUsers() {
	try {
		const result = await sql`
      SELECT * FROM users
    `;
		return result;
	} catch (error) {
		console.error("Error getting all users:", error);
		throw error;
	}
}

export async function updateUser(userId: number, updateData: User) {
	try {
		const result = await sql`
      UPDATE users
      SET 
        status = ${updateData.status},
        email = ${updateData.email},
        last_login = ${updateData.last_login},
        is_active = ${updateData.is_active}
      WHERE id = ${userId}
      RETURNING *;
    `;
		return result[0];
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
}

export async function updateLastLoginUserToNow(userId: number) {
	try {
		const result = await sql`
      UPDATE users
      SET 
        last_login = ${new Date()}
      WHERE id = ${userId}
      RETURNING *;
    `;
		return result[0];
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
}

export async function changeUserStatus(userId: number, status: UserStatus) {
	try {
		const result = await sql`
      UPDATE users
      SET 
        status = ${status}
      WHERE id = ${userId}
      RETURNING *;
    `;
		return result[0];
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
}

export async function deleteUser(userId: number) {
	try {
		const result = await sql`
      DELETE FROM users
      WHERE id = ${userId}
      RETURNING *;
    `;
		return result[0];
	} catch (error) {
		console.error("Error deleting user:", error);
		throw error;
	}
}
