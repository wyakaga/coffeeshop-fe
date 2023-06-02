import React from "react";
import { useLottie } from "lottie-react";

import loader from "../assets/lottie/loader.json";

function Loader() {
	const options = {
		animationData: loader,
		loop: true,
		autoplay: true,
	};

	const style = {
		width: 640,
		height: 640,
	};

	const { View } = useLottie(options, style);

	return (
		<div className="fixed z-[51] bg-white/40 backdrop-filter backdrop-blur-md inset-0 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen">{View}</div>
		</div>
	);
}

export default Loader;
