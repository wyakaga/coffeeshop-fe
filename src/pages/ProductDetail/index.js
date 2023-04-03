import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

// import coldBrew from "../../assets/img/cold-brew.webp"

function ProductDetail() {
	// eslint-disable-next-line no-undef
	const url = process.env.REACT_APP_SERVER_HOST;

	const [dataProduct, setDataProduct] = useState([]);
	let { id } = useParams();

	useEffect(() => {
		axios
			.get(`${url}/products/${id}`)
			.then((res) => setDataProduct(res["data"]["data"]))
			.catch((err) => console.log(err));
	}, [id]);

	document.title = dataProduct[0] && dataProduct[0]["name"];

	return (
		<div className="body-wrapper grid grid-cols-1 grid-rows-1">
			<Header title="product" />
			<main className="bg-eighth-white relative pt-10 pb-40 px-12">
				<section className="main-wrapper flex flex-col lg:flex-row justify-center gap-20 lg:gap-96 py-12 px-10 lg:px-0">
					<section className="left-content flex flex-col gap-12">
						<div className="product-dir font-rubik font-normal text-xl text-first-gray">
							<p>
								Favorite & Promo{" "}
								<span className="dir-detail text-first-brown font-bold">
									&gt; {dataProduct[0] && dataProduct[0]["name"]}
								</span>
							</p>
						</div>
						<div className="product-info flex flex-col items-center gap-y-10">
							<div className="product-img rounded-full w-96 h-96 overflow-hidden">
								<img
									src={dataProduct[0] && dataProduct[0]["img"]}
									alt="product image"
									className="transform scale-100"
								/>
							</div>
							<div className="product-name-price text-center flex flex-col gap-y-4">
								<p className="font-poppins font-black text-6xl">
									{dataProduct[0] && dataProduct[0]["name"]}
								</p>
								<p className="font-poppins font-medium text-4xl">
									IDR{" "}
									{dataProduct[0] &&
										dataProduct[0]["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
								</p>
							</div>
						</div>
						<div className="utils-btn flex flex-col font-poppins font-bold text-2xl gap-y-6">
							<button className="text-white bg-first-brown rounded-[20px] p-6">Add to Cart</button>
							<button className="text-first-brown bg-first-yellow rounded-[20px] p-6">
								Ask a Staff
							</button>
						</div>
					</section>
					<section className="right-content flex flex-col gap-16">
						<div className="desc-size-wrapper flex flex-col gap-y-12 bg-white rounded-[20px] p-16">
							<div className="delivery-desc font-poppins font-normal text-[1.5625rem] text-first-brown">
								<p>
									Delivery only on{" "}
									<b>
										Monday to <br />
										Friday
									</b>{" "}
									at <b>1-7 pm</b>
								</p>
							</div>
							<div className="product-desc font-poppins text-first-brown">
								<p className="font-normal text-[1.5625rem]">
									{dataProduct[0] && dataProduct[0]["description"]}
								</p>
							</div>
							<div className="size-btn flex flex-col gap-y-4">
								<p className="text-center font-poppins font-bold text-2xl">Choose a size</p>
								<div className="flex flex-row gap-x-20 justify-center">
									<button className="font-poppins font-bold text-3xl text-center bg-first-yellow rounded-full w-[4.375rem] h-[4.375rem]">
										R
									</button>
									<button className="font-poppins font-bold text-3xl text-center bg-first-yellow rounded-full w-[4.375rem] h-[4.375rem]">
										L
									</button>
									<button className="font-poppins font-bold text-3xl text-center bg-first-yellow rounded-full w-[4.375rem] h-[4.375rem]">
										XL
									</button>
								</div>
							</div>
						</div>
						<div className="delivery-time flex flex-col gap-12">
							<div className="delivery-methods flex flex-col gap-y-10 justify-center items-center">
								<p className="font-poppins font-bold text-xl text-center">
									Choose Delivery Methods
								</p>
								<div className="delivery-btn font-poppins flex flex-row gap-x-8">
									<div className="deliv-btn font-poppins">
										<input type="radio" name="option" id="dine-in" className="peer hidden" />
										<label
											htmlFor="dine-in"
											className="select-none rounded-[10px] py-3 px-5 text-center bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-none peer-checked:bg-first-brown peer-checked:text-white peer-checked:font-bold"
										>
											Dine in
										</label>
									</div>
									<div className="deliv-btn font-poppins">
										<input type="radio" name="option" id="door-delivery" className="peer hidden" />
										<label
											htmlFor="door-delivery"
											className="select-none rounded-[10px] py-3 px-5 text-center bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-none peer-checked:bg-first-brown peer-checked:text-white peer-checked:font-bold"
										>
											Door Delivery
										</label>
									</div>
									<div className="deliv-btn font-poppins">
										<input type="radio" name="option" id="pick-up" className="peer hidden" />
										<label
											htmlFor="pick-up"
											className="select-none rounded-[10px] py-3 px-5 text-center bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-none peer-checked:bg-first-brown peer-checked:text-white peer-checked:font-bold"
										>
											Pick up
										</label>
									</div>
								</div>
							</div>
							<div className="set-time flex flex-row items-center justify-center gap-x-7">
								<label htmlFor="set-time" className="font-poppins font-normal text-xl">
									Set time:
								</label>
								<input
									type="text"
									name="set-time"
									placeholder="Enter the time you'll arrived"
									className="font-poppins border-b border-fourth-gray w-3/4 outline outline-0 bg-eighth-white"
								/>
							</div>
						</div>
					</section>
					<section className="floating flex flex-col lg:flex-row items-center gap-y-8 lg:gap-x-10 lg:absolute bottom-[-70px]">
						<div className="product-qty flex flex-row justify-center gap-x-40 lg:gap-x-80 w-full lg:w-3/4 bg-white rounded-[20px] py-8 px-20">
							<div className="product-info flex flex-row items-center justify-center gap-x-8">
								<div className="product-img w-[100px] h-[100px] rounded-full overflow-hidden">
									<img
										src={dataProduct[0] && dataProduct[0]["img"]}
										alt="product image"
										className="object-cover translate-y-[-20px]"
									/>
								</div>
								<div className="info whitespace-nowrap">
									<p className="font-poppins font-bold text-2xl">
										{dataProduct[0] && dataProduct[0]["name"]}
									</p>
									<p className="font-poppins text-xl">x1 (Large)</p>
									<p className="font-poppins text-xl flex flex-nowrap">x1 (Regular)</p>
								</div>
							</div>
							<div className="counter flex flex-row items-center justify-center gap-x-6">
								<button className="w-[40px] h-[40px] rounded-full bg-third-yellow font-bold text-first-brown text-2xl flex items-center justify-center border-none">
									-
								</button>
								<p className="font-poppins font-bold text-2xl">2</p>
								<button className="w-[40px] h-[40px] rounded-full bg-third-yellow font-bold text-first-brown text-2xl flex items-center justify-center border-none">
									+
								</button>
							</div>
						</div>
						<div className="checkout-btn w-full">
							<button className="bg-first-yellow border-none rounded-[20px] font-poppins font-bold text-2xl py-8 lg:py-16 lg:px-20 w-full">
								CHECKOUT
							</button>
						</div>
					</section>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default ProductDetail;
