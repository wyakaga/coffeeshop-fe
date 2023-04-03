import React from "react";

import coffeeLogo from "../assets/icon/coffee-shop-logo.webp";

// eslint-disable-next-line react/prop-types
function HeaderAuth({ pageTitle }) {
	return (
		<header className="lg:pt-8 md:pt-4 lg:pb-2 md:pb-4 lg:px-12 md:px-[3.75rem]">
			<div className="header-wrapper flex flex-row justify-between items-center">
				<a
					href="#"
					className="brand flex items-center text-first-black no-underline font-bold text-[1.19rem] font-rubik"
				>
					<img src={coffeeLogo} alt="coffee shop logo" className="brand-img" />
					Coffee Shop
				</a>
				<h2 className="font-rubik text-4xl font-bold text-first-brown">{pageTitle}</h2>
			</div>
		</header>
	);
}

export default HeaderAuth;
