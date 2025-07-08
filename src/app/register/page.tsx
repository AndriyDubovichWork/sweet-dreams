"use client";

import { useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import {
	getAllInvitationsRequest,
	validateInvitationRequest,
} from "../api/requests";
import { createUser } from "../common/DB/userCrud";
import InvalidRegisterToken from "../common/components/layout/InvalidRegisterToken/InvalidRegisterToken";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function RegisterPage() {
	const searchParams = useSearchParams();

	const token = searchParams.get("token");

	// const { data: session }: { data: any } = useSession();
	const handleGoogleLogin = () => {
		signIn("google", {
			callbackUrl: `/register?token=${token}`,
			token,
		});
	};

	// await getAllInvitationsRequest();
	const isTokenValid = await validateInvitationRequest(token);

	// if (session?.user && isTokenValid) {
	// 	createUser({ email: session?.user?.email as string, status: "user" });
	// }
	if (isTokenValid) {
		return (
			<button onClick={handleGoogleLogin} type="button">
				Sign in with Google
			</button>
		);
	} else {
		return <InvalidRegisterToken />;
	}
}
