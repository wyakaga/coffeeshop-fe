import React from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

import coffeeLogo from "../assets/icon/coffee-shop-logo.webp";
import fbLogo from "../assets/icon/facebook-circle.svg";
import twitterLogo from "../assets/icon/twitter.svg";
import igLogo from "../assets/icon/instagram-circle.svg";

function Footer() {
	const navigate = useNavigate();

	const currentYear = DateTime.now().year;

	return (
		<footer className="py-14 xl:px-4 px-4 bg-first-white font-rubik">
			<div className="flex flex-row justify-between px-6 md:px-8 py-10 gap-y-10 md:gap-56">
				<div className="flex flex-col justify-center gap-4 md:gap-8">
					<div onClick={() => navigate("/")} className="flex flex-1 items-center text-first-black no-underline font-bold text-xl font-rubik cursor-pointer">
						<img src={coffeeLogo} alt="coffee shop logo" className="brand-img" />
						Coffee Shop
					</div>
					<p className="text-first-gray font-medium">
						Coffee Shop is a store that sells some
						<br />
						good meals, and especially coffee. We
						<br />
						provide high quality beans
					</p>
					<div className="flex justify-start">
						<a href="https://www.facebook.com">
							<img src={fbLogo} alt="icon facebook" />
						</a>
						<a href="htpps://www.twitter.com" className="my-0 mx-3">
							<img src={twitterLogo} alt="icon twitter" />
						</a>
						<a href="htpps://www.instagram.com">
							<img src={igLogo} alt="icon instagram" />
						</a>
					</div>
					<p className="font-normal text-second-gray">&copy;{currentYear}CoffeeShop</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-x-5 md:gap-4 lg:gap-24">
					<div className="flex flex-col gap-2 md:gap-8">
						<div className="font-medium text-second-black">Product</div>
						<div className="grid grid-cols-2 grid-rows-3 md:flex md:flex-col list-none gap-2 md:gap-6">
							<li>
								<a href="#" className="no-underline text-first-gray font-normal">
									Download
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray font-normal">
									Pricing
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray font-normal">
									Locations
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray font-normal">
									Countries
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray font-normal">
									Blog
								</a>
							</li>
						</div>
					</div>
					<div className="flex flex-col gap-2 md:gap-8">
						<div className="font-medium text-second-black">Engage</div>
						<div className="grid grid-cols-2 grid-rows-3 md:whitespace-nowrap lg:whitespace-normal md:flex md:flex-col list-none gap-2 md:gap-6">
							<li>
								<a href="#" className="no-underline text-first-gray font-normal">
									Coffee Shop ?
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray font-normal">
									FAQ
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray font-normal">
									About Us
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray font-normal">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray font-normal">
									Terms of Service
								</a>
							</li>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;