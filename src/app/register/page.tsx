"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
	createInvitationRequest,
	getAllInvitationsRequest,
	validateInvitationRequest,
} from "../api/requests";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function RegisterPage() {
	const searchParams = useSearchParams();

	const token = searchParams.get("token");

	const handleGoogleLogin = () => {
		signIn("google", {
			callbackUrl: "/",
			token,
		});
	};

	console.log(await getAllInvitationsRequest());
	const isTokenValid = await validateInvitationRequest(token as string);

	if (isTokenValid) {
		return (
			<button onClick={handleGoogleLogin} type="button">
				Sign in with Google
			</button>
		);
	} else {
		return <div>invalid token</div>;
	}
}
