import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL!);

export async function createInvitation(createdBy: number, email?: string) {
  const token = uuidv4();

  const result = await sql`
    INSERT INTO invitations (token, email, created_by)
    VALUES (${token}, ${email || null}, ${createdBy})
    RETURNING token
  `;

  const invitationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/register?token=${token}`;
  return invitationUrl;
}

export async function validateInvitation(token: string) {
  const result = await sql`
    SELECT id, email, used, expires_at < NOW() AS expired
    FROM invitations
    WHERE token = ${token}
  `;

  if (result.length === 0) {
    return { valid: false, error: 'Invalid token' };
  }

  const invitation = result[0];

  if (invitation.used) {
    return { valid: false, error: 'Token already used' };
  }

  if (invitation.expired) {
    return { valid: false, error: 'Token expired' };
  }

  return {
    valid: true,
    email: invitation.email,
    invitationId: invitation.id,
  };
}

export async function markInvitationUsed(token: string, userId: number) {
  await sql`
    UPDATE invitations
    SET used = TRUE, used_at = NOW(), used_by = ${userId}
    WHERE token = ${token}
  `;
}
