"use client";

import { signOut, useSession } from "next-auth/react";

export default function UserNotRegistered({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session, update } = useSession();

	const handleReload = async () => {
		await update();
		signOut();

		window.location.reload(); // Optional
	};

	if (session === null) {
		return (
			<button onClick={handleReload} type="button">
				Refresh Session
			</button>
		);
	}
	return children;
}
