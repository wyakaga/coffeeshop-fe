import React from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import hazelnut from "../../assets/img/hazelnut-latte.webp";
import chicken from "../../assets/img/chicken-fire.webp";
import cardIcon from "../../assets/icon/card-icon.svg";
import bankIcon from "../../assets/icon/bank-icon.svg";
import codIcon from "../../assets/icon/fast-delivery.webp";

function Payment() {

	document.title = "Your Cart";

	return (
		<div className="body-wrapper grid grid-cols-1 grid-rows-1">
			<Header title="payment" />
			<main className="payment-bg bg-cover bg-center">
				<section className="flex flex-col pb-24 m-10 gap-y-10">
					<section className="page-title">
						<p className="font-rubik font-bold text-[40px] text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.8)]">
							Checkout your <br /> item now!
						</p>
					</section>
					<section className="page-content flex lg:flex-row md:flex-col md:gap-y-5 lg:justify-between">
						<section className="left-side">
							<div className="order-container bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.35)] rounded-[20px] flex flex-col px-16 pt-20 pb-20 gap-y-20">
								<div className="order-title">
									<p className="font-poppins font-bold text-4xl text-third-brown text-center">
										Order Summary
									</p>
								</div>
								<div className="order-details flex flex-col gap-y-5">
									<div className="order-items flex flex-col gap-y-4">
										<div className="lg:flex lg:flex-row md:grid md:grid-cols-2">
											<img
												src={hazelnut}
												className="order-img w-[82px] h-[90px] rounded-[20px] mr-8"
											/>
											<div className="order-info font-poppins font-normal text-xl">
												<div className="product">Hazelnut Latte</div>
												<div className="qty-price flex flex-row justify-between">
													<p>x 1</p>
													<p>IDR 24.0</p>
												</div>
												<div className="size">Regular</div>
											</div>
										</div>
										<div className="lg:flex lg:flex-row md:grid md:grid-cols-2">
											<img
												src={chicken}
												className="order-img w-[82px] h-[90px] rounded-[20px] mr-8"
											/>
											<div className="order-info font-poppins font-normal text-xl">
												<div className="product">Chicken Fire Wings</div>
												<div className="qty-price flex flex-row justify-between">
													<p>x 2</p>
													<p>IDR 30.0</p>
												</div>
											</div>
										</div>
									</div>
									<div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
									<div className="order-prices mb-4">
										<div className="grid grid-cols-2">
											<p>SUBTOTAL</p>
											<p className="justify-self-end">IDR 120.000</p>
										</div>
										<div className="grid grid-cols-2">
											<p>TAX & FEES</p>
											<p className="justify-self-end">IDR 20.000</p>
										</div>
										<div className="grid grid-cols-2">
											<p>SHIPPING</p>
											<p className="justify-self-end">IDR 10.000</p>
										</div>
									</div>
									<div className="total-price flex flex-row justify-between font-poppins font-bold text-3xl">
										<p>TOTAL</p>
										<p>IDR 150.000</p>
									</div>
								</div>
							</div>
						</section>
						<section className="right-side flex flex-col gap-y-5">
							<div className="address-container flex flex-col gap-y-4">
								<div className="container-title flex flex-rows justify-between">
									<p className="font-poppins font-bold text-2xl text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.8)]">
										Address details
									</p>
									<p className="font-poppins font-bold text-base text-white">edit</p>
								</div>
								<div className="container-content font-poppins text-xl bg-white shadow-[0px,10px,40px,rgba(0,0,0,0.2)] rounded-[20px] p-10 flex flex-col gap-y-1">
									<p className="font-normal">
										<b>Delivery</b> to Iskandar Street
									</p>
									<div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
									<p className="font-normal">
										KM 5 refinery road opposite the
										<br />
										public road, effurun, Jakarta
									</p>
									<div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
									<p className="font-normal">+62 81348287878</p>
								</div>
							</div>
							<div className="method-container flex flex-col gap-y-4">
								<div className="container-title">
									<p className="font-poppins font-bold text-2xl text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.8)]">
										Payment method
									</p>
								</div>
								<div className="container-content bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.2)] rounded-[20px] p-10 flex flex-col gap-y-3">
									<div className="flex flex-row items-center">
										<input
											type="radio"
											name="payment-method"
											id="card"
											className="h-5 w-5 checked:accent-second-brown mr-2"
										/>
										<label
											htmlFor="card"
											className="flex flex-row items-center font-poppins text-xl"
										>
											<img
												src={cardIcon}
												alt="card-icon"
												className="bg-second-orange p-2 rounded-md mr-2 w-[40px] h-[40px]"
											/>{" "}
											Card
										</label>
									</div>
									<div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
									<div className="flex flex-row items-center">
										<input
											type="radio"
											name="payment-method"
											id="bank-account"
											className="h-5 w-5 checked:accent-second-brown mr-2"
										/>
										<label
											htmlFor="bank-account"
											className="flex flex-row items-center font-poppins text-xl"
										>
											<img
												src={bankIcon}
												alt="bank-icon"
												className="bg-second-brown p-2 rounded-md mr-2 w-[40px] h-[40px]"
											/>{" "}
											Bank account
										</label>
									</div>
									<div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
									<div className="flex flex-row items-center">
										<input
											type="radio"
											name="payment-method"
											id="cod"
											className="h-5 w-5 checked:accent-second-brown mr-2"
										/>
										<label
											htmlFor="cod"
											className="flex flex-row items-center font-poppins text-xl"
										>
											<img
												src={codIcon}
												alt="cod-icon"
												className="bg-first-yellow p-2 rounded-md mr-2 w-[40px] h-[40px]"
											/>{" "}
											Cash on delivery
										</label>
									</div>
								</div>
							</div>
							<button className="bg-second-brown shadow-[0px_10px_20px_rgba(137,85,55,0.4)] rounded-[20px] w-full p-5">
								<p className="font-poppins font-bold text-xl text-center text-white">
									Confirm and Pay
								</p>
							</button>
						</section>
					</section>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default Payment;
