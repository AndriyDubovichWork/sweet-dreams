"use client";

import { UserRights } from "@/app/common/types/session";
import { useSession } from "next-auth/react";
import Centered from "../Centered/Centered";
import { AcessControllProps } from "@/app/common/hocs/types/AcessControll";
import RegisteredOnly from "../RegisteredOnly/RegisteredOnly";
import { useLoadingStateStore } from "@/app/common/store/useLoadingStateStore";
import AccessDenied from "../../components/layout/AccessDenied/AccessDenied";
import Spinner from "../../components/ui/Spinner/Spinner";

export default function AcessControll({
	children,
	IsregisteredUsersAllowed,
	isAdminOnly,
}: AcessControllProps) {
	const { data: session }: { data: any } = useSession();
	const role: UserRights = session?.user?.role;
	const { status } = useLoadingStateStore();

	switch (role) {
		case "admin":
			return children;
		case "user":
		case "superUser":
			if (IsregisteredUsersAllowed) {
				return <RegisteredOnly>{children}</RegisteredOnly>;
			}
			if (isAdminOnly && status !== "pending") {
				return (
					<Centered>
						<AccessDenied />
					</Centered>
				);
			} else {
				return <></>;
			}
		default:
			return (
				<Centered>
					<Spinner size={90} />
				</Centered>
			);
	}
}
