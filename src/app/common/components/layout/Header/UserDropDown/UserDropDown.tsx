import { signIn, signOut, useSession } from "next-auth/react";
import style from "./UserDropDown.module.scss";
import Button from "@/app/common/components/ui/Button/Button";
import DropDown from "../../DropDown/DropDown";
import Spinner from "../../../ui/Spinner/Spinner";

export default function UserDropDown() {
	const { data: session, status } = useSession();
	switch (status) {
		case "authenticated":
			return (
				<DropDown
					thumbnail={
						<img
							className={style.userImg}
							src={session?.user?.image || "img"}
							alt={session?.user?.name || "name"}
						/>
					}
					content={
						<div
							type="button"
							onClick={() => signOut()}
							style={{ zIndex: 10 }}
							className={style.dropDown}
						>
							log out
						</div>
					}
				/>
			);
		case "unauthenticated":
			return <Button onClick={() => signIn()}>login</Button>;

		case "loading":
			return <Spinner className={style.userImg} />;
	}
}
