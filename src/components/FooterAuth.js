import React from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

import coffeeLogo from "../assets/icon/coffee-shop-logo.webp";
import fbLogo from "../assets/icon/facebook-circle.svg";
import igLogo from "../assets/icon/instagram-circle.svg";
import twitterLogo from "../assets/icon/twitter.svg";

function FooterAuth() {
	const currentYear = DateTime.now().year;

	return (
		<footer className="py-14 px-0 bg-first-white">
			<div className="footer-wrapper flex flex-row justify-around lg:py-10 p-0">
				<div className="identity flex flex-col p-4 justify-center gap-6">
					<Link to={"/"} className="brand flex items-center text-first-black no-underline font-bold text-[1.19rem] font-rubik">
						<img src={coffeeLogo} alt="coffee shop logo" className="brand-img" />
						Coffee Shop
					</Link>
					<p className="font-medium text-first-gray">
						Coffee Shop is a store that sells some
						<br />
						good meals, and especially coffee. We
						<br />
						provide high quality beans
					</p>
					<div className="socials flex justify-start">
						<a href="https://www.facebook.com">
							<img src={fbLogo} alt="icon facebook" />
						</a>
						<a href="https://www.twitter.com" className="my-0 mx-3">
							<img src={twitterLogo} alt="icon twitter" />
						</a>
						<a href="https://www.instagram.com">
							<img src={igLogo} alt="icon instagram" />
						</a>
					</div>
					<p id="copyright" className="font-normal text-second-gray">
						&copy;{currentYear}CoffeeShop
					</p>
				</div>
				<div className="links grid grid-cols-1 grid-rows-2 lg:gap-10 gap-0 lg:p-4 p-0">
					<div className="products flex flex-col lg:gap-4 gap-2">
						<div className="title font-medium text-first-black">Product</div>
						<div className="list grid grid-cols-2 grid-rows-3 list-none gap-2">
							<li>
								<a href="#" className="no-underline text-first-gray">
									Download
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray">
									Pricing
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray">
									Locations
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray">
									Countries
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray">
									Blog
								</a>
							</li>
						</div>
					</div>
					<div className="engages flex flex-col lg:gap-4 gap-2">
						<div className="title font-medium text-first-black">Engage</div>
						<div className="list grid grid-cols-2 grid-rows-3 list-none gap-2">
							<li>
								<a href="#" className="no-underline text-first-gray">
									Coffee Shop?
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray">
									FAQ
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray">
									About Us
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="#" className="no-underline text-first-gray">
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

export default FooterAuth;
