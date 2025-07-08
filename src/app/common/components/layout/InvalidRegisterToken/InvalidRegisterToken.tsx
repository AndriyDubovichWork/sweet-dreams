import Centered from "@/app/common/hocs/Centered/Centered";
import useStylesProvider from "@/app/common/hooks/useStylesProvider";
import React from "react";

export default function InvalidRegisterToken() {
	const { invalidRegisterToken } = useStylesProvider();
	return (
		<Centered absolute={false} content styles={invalidRegisterToken}>
			sorry but you are not welcome here
		</Centered>
	);
}
