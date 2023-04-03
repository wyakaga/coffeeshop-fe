import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

import promoMother from "../../assets/img/mothers-day.webp";
import promoFreeCoffee from "../../assets/img/free-coffee.webp";
import promoHalloween from "../../assets/img/halloween-day.webp";
import searchIcon from "../../assets/icon/search.svg";

function Product() {
	const tabsData = [
		{ label: "Favorite & Promo" },
		{ label: "Coffee" },
		{ label: "Non Coffee" },
		{ label: "Foods" },
		{ label: "Add-On" },
	];

	const [dataProduct, setDataProduct] = useState([]);

	const [category, setCategory] = useState("");
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [sort, setSort] = useState("");
	const [keyword, setKeyword] = useState("");
	const [pageLimit, setPageLimit] = useState(12);
	const [currentPage, setCurrentPage] = useState(1);

	const [searchParams, setSearchParams] = useSearchParams();

	// eslint-disable-next-line no-undef
	const url = process.env.REACT_APP_SERVER_HOST;

	useEffect(() => {
		axios
			.get(
				`${url}/products${`?${
					`category=${category || searchParams.get("category") || ""}` || ""
				}${`&order=${sort || searchParams.get("order") || ""}`}${`&search=${
					keyword || searchParams.get("search") || ""
				}`}${`&limit=${pageLimit}`}${`&page=${
					currentPage || parseInt(searchParams.get("page")) || 1
				}`}`}`
			)
			.then((res) => setDataProduct(res["data"]["data"]))
			.catch((err) => console.log(err));
	}, [category, sort, keyword, pageLimit, currentPage, searchParams]);

	const handleClickCategory = (category, idx) => {
		setCategory(category);
		setActiveTabIndex(idx);
		searchParams.set("category", category);
		setSearchParams(searchParams);
	};

	const handleSort = (e) => {
		let value = e.target.value;
		setSort(value);
		searchParams.set("order", value);
		setSearchParams(searchParams);
	};

	const handleSearch = (e) => {
		setKeyword(e.target.value);
		searchParams.set("search", e.target.value);
		setSearchParams(searchParams);
	};

	const debouncedSearch = useMemo(() => debounce(handleSearch, 1000), []);

	const handlePaginate = (limit = pageLimit, page, increase) => {
		setPageLimit(limit);
		setCurrentPage(page + increase);
		searchParams.set("page", currentPage === 1 ? page + 1 : page);
		setSearchParams(searchParams);
	};

	const firstRule = currentPage > pageLimit - 1 && dataProduct.length === pageLimit;
	const secondRule = currentPage < pageLimit - 1 && dataProduct.length === pageLimit;

	document.title = "Product";

	return (
		<div className="body-wrapper grid grid-cols-1 grid-rows-1">
			<Header title="product" />
			<main className="border-t border-solid">
				<div className="product-contents flex lg:grid flex-col lg:grid-cols-6">
					<section className="left-content flex flex-col items-center gap-y-10 border-r border-solid py-8 col-span-2">
						<div className="promo-desc flex flex-col text-center gap-y-2">
							<p className="m-0 font-rubik font-bold text-[1.563rem] text-first-brown">
								Promo Today
							</p>
							<p className="m-0 font-poppins font-normal text-xs">
								Coupons will be updated every weeks. <br /> Check them out!
							</p>
						</div>
						<div className="promo-details flex flex-col gap-4 w-[20.938rem]">
							<div
								id="promo-detail"
								className="bg-first-green flex flex-row w-full h-[6.813rem] rounded-[20px] cursor-pointer transition-transform duration-300 hover:transform hover:scale-110"
							>
								<img src={promoMother} alt="mother" className="w-[5.313rem] h-[5.875rem]" />
								<div className="detail-desc flex flex-col gap-y-2 p-4">
									<p className="font-bold m-0 font-poppins text-sm">HAPPY MOTHER&apos;S DAY</p>
									<p className="font-normal m-0 font-poppins text-sm">
										Get one of our favorite <br /> menu for free!
									</p>
								</div>
							</div>
							<div
								id="promo-detail"
								className="bg-first-yellow flex flex-row w-full h-[6.813rem] rounded-[20px] cursor-pointer transition-transform duration-300 hover:transform hover:scale-110"
							>
								<img src={promoFreeCoffee} alt="man" className="w-[5.313rem] h-[5.875rem]" />
								<div className="detail-desc flex flex-col gap-y-2 p-4">
									<p className="font-bold m-0 font-poppins text-sm">
										Get a cup of coffee for free <br /> on sunday morning
									</p>
									<p className="font-normal m-0 font-poppins text-sm">Only at 7 to 9 am</p>
								</div>
							</div>
							<div
								id="promo-detail"
								className="bg-first-green flex flex-row w-full h-[6.813rem] rounded-[20px] cursor-pointer transition-transform duration-300 hover:transform hover:scale-110"
							>
								<img src={promoMother} alt="mother" className="w-[5.313rem] h-[5.875rem]" />
								<div className="detail-desc flex flex-col gap-y-2 p-4">
									<p className="font-bold m-0 font-poppins text-sm">HAPPY MOTHER&apos;S DAY</p>
									<p className="font-normal m-0 font-poppins text-sm">
										Get one of our favorite <br /> menu for free!
									</p>
								</div>
							</div>
							<div
								id="promo-detail"
								className="bg-first-orange flex flex-row w-full h-[6.813rem] rounded-[20px] cursor-pointer transition-transform duration-300 hover:transform hover:scale-110"
							>
								<img
									src={promoHalloween}
									alt="halloween cosplay"
									className="w-[5.313rem] h-[5.875rem]"
								/>
								<div className="detail-desc flex flex-col gap-y-2 p-4">
									<p className="font-bold m-0 font-poppins text-sm">HAPPY HALLOWEEN</p>
									<p className="font-normal m-0 font-poppins text-sm">
										Do you like chicken wings? Get 1 <br /> free only if you buy pinky promise
									</p>
								</div>
							</div>
						</div>
						<div className="coupon w-[20.983rem] h-16">
							<button className="w-full h-full p-0 bg-first-brown text-white border-none rounded-[20px] font-poppins font-bold text-[1.063rem] transition-colors duration-300 hover:bg-first-yellow hover:text-first-brown">
								Apply Coupon
							</button>
						</div>
						<div className="t-and-c">
							<ol className="ml-[1.8px] p-0 font-rubik font-bold text-xs">Terms and Condition</ol>
							<li className="list-decimal list-inside font-rubik font-normal text-xs">
								You can only apply 1 coupon per day
							</li>
							<li className="list-decimal list-inside font-rubik font-normal text-xs">
								It only for dine in
							</li>
							<li className="list-decimal list-inside font-rubik font-normal text-xs">
								Buy 1 get 1 for new user
							</li>
							<li className="list-decimal list-inside font-rubik font-normal text-xs">
								Should make member card to apply coupon
							</li>
						</div>
					</section>
					<section className="right-content flex flex-col py-8 px-20 gap-20 col-span-4">
						<div className="flex flex-row justify-between">
							<div>
								<div className="relative">
									<input
										type="text"
										placeholder="Search here..."
										className="border border-gray-300 hover:border-gray-400 focus:outline-none appearance-none bg-white rounded-md h-10 pl-5 pr-10"
										onChange={debouncedSearch}
									/>
									<img
										src={searchIcon}
										alt="search icon"
										className="h-1/2 absolute top-[10px] right-[10px] cursor-pointer"
									/>
								</div>
							</div>
							<div>
								<div className="relative">
									<svg
										className="w-2 h-2 absolute top-0 left-[110px] m-4 pointer-events-none"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 412 232"
									>
										<path
											d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
											fill="#648299"
											fillRule="nonzero"
										/>
									</svg>
									<select
										className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
										name="price-sort"
										id="price-sort"
										onChange={handleSort}
									>
										<option value="">Sort price by</option>
										<option value="cheapest">Cheapest</option>
										<option value="priciest">Priciest</option>
									</select>
								</div>
							</div>
						</div>
						<div className="products-header flex flex-row justify-between">
							{tabsData.map((tab, idx) => {
								return (
									<p
										key={idx}
										className={`font-rubik text-xl m-0 border-b-[3px] border-solid cursor-pointer transition-colors duration-300 ${
											idx === activeTabIndex
												? "font-bold text-first-brown border-b-first-brown"
												: "font-normal text-fourth-gray border-b-transparent hover:border-b-gray-200"
										}`}
										onClick={() =>
											handleClickCategory(tab.label === "Favorite & Promo" ? "" : tab.label, idx)
										}
									>
										{tab.label}
									</p>
								);
							})}
						</div>
						<div className="products-content grid grid-cols-4 grid-rows-3 gap-y-20 gap-x-8">
							{dataProduct.map((item) => {
								return (
									<ProductCard
										key={item.id}
										id={item.id}
										src={item["img"]}
										name={item["name"]}
										price={item["price"]}
									/>
								);
							})}
						</div>
						{(function () {
							if (currentPage === 1 && dataProduct.length === pageLimit) {
								return (
									<div className="pagination flex justify-center">
										<ul className="flex bg-white text-lg font-poppins border border-solid rounded-md cursor-pointer">
											<li className="border-r-[0.5px] border-solid py-1 px-3">{currentPage}</li>
											<li
												className="py-1 px-3"
												onClick={() => handlePaginate(pageLimit, currentPage, 1)}
											>
												Next
											</li>
										</ul>
									</div>
								);
							} else if (
								(firstRule && dataProduct.length === pageLimit) ||
								(secondRule && dataProduct.length === pageLimit)
							) {
								return (
									<div className="pagination flex justify-center">
										<ul className="flex bg-white text-lg font-poppins border border-solid rounded-md cursor-pointer">
											<li
												className="py-1 px-3"
												onClick={() => handlePaginate(pageLimit, currentPage - 1, 0)}
											>
												Previous
											</li>
											<li className="border-x-[0.5px] border-solid py-1 px-3">{currentPage}</li>
											<li
												className="py-1 px-3"
												onClick={() => handlePaginate(pageLimit, currentPage + 1, 1)}
											>
												Next
											</li>
										</ul>
									</div>
								);
							} else if (currentPage !== 1 && !firstRule && !secondRule) {
								return (
									<div className="pagination flex justify-center">
										<ul className="flex bg-white text-lg font-poppins border border-solid rounded-md cursor-pointer">
											<li
												className="py-1 px-3"
												onClick={() => handlePaginate(pageLimit, currentPage - 1, 0)}
											>
												Previous
											</li>
											<li className="border-r-[0.5px] border-solid py-1 px-3">{currentPage}</li>
										</ul>
									</div>
								);
							}
						})()}
						<div className="products-footer">
							<p className="font-poppins font-normal text-[1.063rem] text-first-brown">
								*the price has been cutted by discount appears
							</p>
						</div>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Product;
