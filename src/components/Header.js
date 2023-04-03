/* eslint-disable react/prop-types */
import React, { useState } from "react";

import coffeeLogo from "../assets/icon/coffee-shop-logo.webp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import searchLogo from "../assets/icon/search.svg";
import defaultProfile from "../assets/img/profile-placeholder.webp";

//TODO: make this component search icon become different in product page
function Header(props) {
	const [toggleState, setToggleState] = useState(false);

	const handleToggle = () => setToggleState((toggleState) => !toggleState);

	let navbarActive = toggleState
		? "flex absolute bg-white z-10 w-full p-5 gap-8 rounded-lg shadow-lg left-[0px] top-[100px]"
		: null;

	const token = useSelector((state) => state.auth.data.token);
	const img = useSelector((state) => state.auth.data.data?.img);

	return (
		<header className="sticky top-0 z-50 bg-white">
			<nav className="flex flex-row relative justify-between lg:justify-start p-10">
				<div className="md:flex md:w-1/4 md:justify-start md:items-center md:text-first-black md:no-underline md:font-bold md:text-xl md:font-rubik">
					<a
						href="#"
						className="flex items-center text-first-black no-underline font-bold text-xl font-rubik"
					>
						<img src={coffeeLogo} alt="coffee shop logo" className="brand-img" />
						Coffee Shop
					</a>
				</div>
				<div className="lg:hidden flex">
					<div className="toggler" onClick={handleToggle}>
						<span className="bar"></span>
						<span className="bar"></span>
						<span className="bar"></span>
					</div>
				</div>
				<div
					className={`right-nav lg:flex lg:static lg:z-0 lg:shadow-none lg:p-0 lg:rounded-none lg:gap-96 ${
						navbarActive || "md:hidden"
					}`}
				>
					<div className="flex lg:flex-row flex-col list-none items-center lg:justify-center lg:gap-8">
						<li className="flex items-center">
							<Link to={"/"}>
								<p className={`no-underline font-rubik ${props.title === "home" ? "nav-active" : ""}`}>
									Home
								</p>
							</Link>
						</li>
						<li className="flex items-center">
							<Link to={"/products"}>
								<p className={`no-underline font-rubik ${props.title === "product" ? "nav-active" : ""}`}>
									Product
								</p>
							</Link>
						</li>
						<li className="flex items-center">
							<Link to={"/payment"}>
								<p className={`no-underline font-rubik ${props.title === "payment" ? "nav-active" : ""}`}>
									Your Cart
								</p>
							</Link>
						</li>
						<li className="flex items-center">
							<Link to={"/history"}>
								<p className={`no-underline font-rubik ${props.title === "history" ? "nav-active" : ""}`}>
									History
								</p>
							</Link>
						</li>
					</div>
					{token ? (
						<div className="flex flex-row justify-center items-center gap-8">
							<div className="search">
								<img src={searchLogo} alt="search icon" />
							</div>
							<div className="flex items-center relative">
								<p className="notif-txt">1</p>
								<svg
									width="30"
									height="30"
									viewBox="0 0 30 30"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
								>
									<rect width="30" height="30" fill="url(#pattern0)" />
									<defs>
										<pattern
											id="pattern0"
											patternContentUnits="objectBoundingBox"
											width="1"
											height="1"
										>
											<use xlinkHref="#image0_78_615" transform="scale(0.00390625)" />
										</pattern>
										<image
											id="image0_78_615"
											width="256"
											height="256"
											xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACKFBMVEUAAABRUWhQVmVOVmRPVmVQVmVPVmVPVmVPVmVOVmVPVWVVVWFOWGdPVmVPVmZPVmVPVmVQV2VQVWROTmJOVWVPVmVPVWVPVmZVVWpLWmlQVmZPVmVPVmRQUGAAAABPV2RPVmVOVWWAgIBQV2ZOVmVPVWVNVWRQVmZPVmVQVmVPVmVPVmVAQIBQVmVOVmZmZmZPVmRPVmVPV2VPVmVPVWRPVWVPVmVPVmVPVWVOVmVOVmROVmVPV2ZNV2VOVmVPVmVPVmVVVWZPVmVOVmVNTWZPVmVPVWZPVmVOVmVGXV1PVmVPVmVPVmVNV2RRVWdPVmRQV2RPVWVSUmRPWGFQVWVPVmVPVWZPWGVPV2ZOVWRPVmVQV2VPVmVNWWZQVWRPV2VPVmVOVmVPVmVPV2ZQVmVPV2VPVmVVVVVJSW1RV2NQV2VPVmVPVmVPVmVQV2VQVmVPVWRPVmVNU2VPVmRPVWdPVmVOVmZQWGhOWGJPVmVQVmVPVmRPVWZOVmNOVmVNVWZRV2dPVmRQVWRPWGZJW21PVmVPVmVPVWZVVXFPVmZPVmVSUmZPVmVPVmVOV2ZPV2RPV2ZQVWVPVmVPVmVSUmNQVmZOV2ZPVWRRUWtPV2VOV2VPV2VPVmVAYGBOV2RRV2RQVmZPVWZPVmVPVmRTU2JPVmNOVWRQVmZVVVVPVmRPVmVOVWVOVmVPVmVOVmVPV2RPVmVOVmdQVmRQV2ZRVWVPVmVPVmUAAAClOHFbAAAAtnRSTlMAFlN/p83e7vqmfhU0jtP+0o0zDXLV1HEMEYDt7BABXulvAiPDwiFQ8VaLiASdowWysZ+kVFHw779iXOpkNWXy6A/maArbe/d8C3f46zg553DRHB0w9i06inXP2v0UY2rzqcxnyuD5BgcskPSV/JO9vJIrkSq7XyAa5aprzjuJHi96ZjcO1vVaCZS+GcnhVYSosKHkH33dyxOiW9eXCJYpdnjcwSJNRXMDm3ROwOPQpUQ+oEY/+yu1ILUAAAABYktHRACIBR1IAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5AoUEAQV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"
										/>
									</defs>
								</svg>
							</div>
							<div className="flex items-center">
								<Link to={"/profile"}>
									<img src={img ? img : defaultProfile} alt="profile photo" className="profile-img" />
								</Link>
							</div>
						</div>
					) : (
						<div className="flex flex-row justify-center items-center gap-8">
							<div className="auth-login-wrapper flex items-center">
								<div className="auth-login p-2">
									<Link to={"/login"}>
										<p className="text-second-black no-underline font-rubik font-medium">Login</p>
									</Link>
								</div>
							</div>
							<div className="auth-signup-wrapper flex items-center rounded-md bg-first-yellow">
								<div className="auth-signup whitespace-nowrap p-2">
									<Link to={"/signup"}>
										<p className="text-first-brown no-underline font-rubik font-medium">Sign Up</p>
									</Link>
								</div>
							</div>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Header;
