import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";

import { getUser } from "../../utils/https/user";
import { createTransaction } from "../../utils/https/transaction";
import { cartAction } from "../../redux/slices/cart";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CartCard from "../../components/CartCard";
import EmptyCart from "../../components/EmptyCart";
import Loader from "../../components/Loader";

import cardIcon from "../../assets/icon/card-icon.svg";
import bankIcon from "../../assets/icon/bank-icon.svg";
import codIcon from "../../assets/icon/fast-delivery.webp";

function Payment() {
	const dispatch = useDispatch();

	const id = useSelector((state) => state.auth.data?.data?.id);
	const token = useSelector((state) => state.auth.data?.token);
	const cartData = useSelector((state) => state.cart.cart);
	const deliveryMethod = useSelector((state) => state.cart.delivery);

	let subtotalOnCart = 0;
	cartData.forEach((cartItem) => (subtotalOnCart += cartItem.subtotal));
	const taxAndFee = subtotalOnCart * 0.05;
	const shippingFee = parseInt(deliveryMethod) === 3 ? 10000 : 0;
	const grandTotal = subtotalOnCart + taxAndFee + shippingFee;

	const [userData, setUserData] = useState([]);
	const [form, setForm] = useState({ address: "", "address-details": "", "phone-number": null });
	const [paymentMethod, setPaymentMethod] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const controller = useMemo(() => new AbortController(), []);

	useEffect(() => {
		setIsLoading(true);
		getUser(id, token, controller)
			.then((res) => {
				setUserData(res.data.data[0]);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, []);

	const onChangePayment = (e) => {
		setPaymentMethod(e.target.value);
	};

	const closeHandler = () => {
		setIsDialogOpen(false);
	};

	const onChangeForm = (e) => {
		setForm((form) => {
			return { ...form, [e.target.name]: e.target.value };
		});
	};

	const payHandler = () => {
		const newCartData = cartData.map((item) => {
			const { product_id, size_id, qty, subtotal } = item;
			const newItem = { product_id, size_id, qty, subtotal };
			return newItem;
		});

		const body = {
			status_id: 1,
			promo_id: 1,
			payment_id: paymentMethod,
			delivery_id: deliveryMethod,
			products: newCartData,
		};

		toast.promise(
			createTransaction(body, token, controller).then(() => {
				dispatch(cartAction.resetCart());
				setPaymentMethod(0);
			}),
			{
				loading: "Please wait...",
				success: "Your payment is success",
				error: "Something went wrong",
			},
			{
				duration: 5000,
			}
		);
	};

	document.title = "Your Cart";

	return (
		<div className="body-wrapper grid grid-cols-1 grid-rows-1">
			<Header title="payment" />
			<main className="payment-bg bg-cover bg-center">
				{isLoading && <Loader />}
				<section className="flex flex-col pb-24 m-10 gap-y-10">
					<section className="page-title">
						<p className="font-rubik font-bold text-[40px] text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.8)]">
							Checkout your <br /> item now!
						</p>
					</section>
					<section className="page-content flex lg:flex-row md:flex-col md:gap-y-5 lg:justify-between lg:gap-x-44">
						<section className="left-side lg:w-1/2 lg:min-h-[631.6px]">
							<div className="order-container bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.35)] rounded-[20px] flex flex-col justify-evenly px-16 pt-20 pb-20 gap-y-20 h-full">
								<div className="order-title">
									<p className="font-poppins font-bold text-4xl text-third-brown text-center">
										Order Summary
									</p>
								</div>
								<div className="order-details flex flex-col gap-y-5">
									<div className="order-items flex flex-col gap-y-4 min-h-[90px] h-[200px] overflow-y-auto scrollbar scrollbar-w-1 scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-track-third-gray/30 scrollbar-thumb-first-brown/70">
										{cartData.length < 1 ? (
											<EmptyCart />
										) : (
											cartData.map((item, index) => <CartCard item={item} key={index} />)
										)}
									</div>
									<div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
									<div className="order-prices mb-4">
										<div className="grid grid-cols-2">
											<p>SUBTOTAL</p>
											<p className="justify-self-end">
												IDR {subtotalOnCart.toLocaleString("id-ID")}
											</p>
										</div>
										<div className="grid grid-cols-2">
											<p>TAX & FEES</p>
											<p className="justify-self-end">IDR {taxAndFee.toLocaleString("id-ID")}</p>
										</div>
										<div className="grid grid-cols-2">
											<p>SHIPPING</p>
											<p className="justify-self-end">IDR {shippingFee.toLocaleString("id-ID")}</p>
										</div>
									</div>
									<div className="total-price flex flex-row justify-between font-poppins font-bold text-3xl">
										<p>TOTAL</p>
										<p>IDR {grandTotal.toLocaleString("id-ID")}</p>
									</div>
								</div>
							</div>
						</section>
						<section className="right-side lg:w-1/2 lg:min-h-[631.6px] flex flex-col gap-y-5">
							<div className="address-container flex flex-col gap-y-4">
								<div className="container-title flex flex-rows justify-between">
									<p className="font-poppins font-bold text-2xl text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.8)]">
										Address details
									</p>
									<p
										onClick={() => setIsDialogOpen(true)}
										className="font-poppins font-bold text-base text-white cursor-pointer"
									>
										edit
									</p>
								</div>
								<div className="container-content min-h-[209.6px] font-poppins text-xl bg-white shadow-[0px,10px,40px,rgba(0,0,0,0.2)] rounded-[20px] p-10 flex flex-col gap-y-1">
									<p className="font-normal">
										<b>Delivery</b> to {form.address ? form.address : userData.address}
									</p>
									<div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
									<p className="font-normal min-h-[56px]">
										{form["address-details"]
											? form["address-details"]
											: "Your address details here"}
									</p>
									<div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
									<p className="font-normal">
										{form["phone-number"] ? form["phone-number"] : userData.phone_number}
									</p>
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
											value={1}
											onChange={onChangePayment}
											className="h-5 w-5 checked:accent-second-brown mr-2 cursor-pointer"
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
											value={2}
											onChange={onChangePayment}
											className="h-5 w-5 checked:accent-second-brown mr-2 cursor-pointer"
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
											value={3}
											onChange={onChangePayment}
											className="h-5 w-5 checked:accent-second-brown mr-2 cursor-pointer"
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
							<button
								onClick={payHandler}
								disabled={paymentMethod === 0 || cartData.length < 1}
								className="bg-second-brown hover:bg-first-yellow text-white hover:text-black disabled:bg-gray-400 disabled:text-fifth-gray transition-all duration-300 shadow-[0px_10px_20px_rgba(137,85,55,0.4)] rounded-[20px] w-full p-5"
							>
								<p className="font-poppins font-bold text-xl text-center">Confirm and Pay</p>
							</button>
						</section>
					</section>
				</section>
				<Dialog
					open={isDialogOpen}
					onClose={closeHandler}
					className="fixed z-[51] bg-white/40 backdrop-filter backdrop-blur-md inset-0 overflow-y-auto"
				>
					<div className="flex items-center justify-center min-h-screen">
						<div className="bg-white w-3/4 lg:w-1/2 p-16 rounded-lg shadow-lg text-center z-[52] relative">
							<h2 className="text-2xl font-rubik font-bold mb-2">Address details</h2>
							<form className="flex flex-col gap-y-6">
								<div className="flex flex-col items-start gap-y-3">
									<label
										htmlFor="address"
										className="font-medium font-poppins text-xl text-sixth-gray"
									>
										Your address
									</label>
									<input
										value={form.address}
										onChange={onChangeForm}
										type="text"
										id="address"
										name="address"
										placeholder="Fill your address here"
										className="outline-0 border-b-2 font-poppins font-normal text-xl w-full focus:border-b-first-green transition-all duration-300 ease-in-out"
									/>
								</div>
								<div className="flex flex-col items-start gap-y-3">
									<label
										htmlFor="address-details"
										className="font-medium font-poppins text-xl text-sixth-gray"
									>
										Your address details
									</label>
									<textarea
										value={form["address-details"]}
										onChange={onChangeForm}
										type="text"
										id="address-details"
										name="address-details"
										placeholder="Fill your address details here"
										className="relative placeholder:absolute placeholder:bottom-0 outline-0 resize-none border-b-2 font-poppins font-normal text-xl w-full focus:border-b-first-green transition-all duration-300 ease-in-out"
									></textarea>
								</div>
								<div className="flex flex-col items-start gap-y-3">
									<label
										htmlFor="phone-number"
										className="font-medium font-poppins text-xl text-sixth-gray"
									>
										Your address
									</label>
									<input
										value={form["phone-number"]}
										onChange={onChangeForm}
										type="number"
										id="phone-number"
										name="phone-number"
										placeholder="Fill your phone number here"
										className="outline-0 border-b-2 font-poppins font-normal text-xl w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-b-first-green transition-all duration-300 ease-in-out"
									/>
								</div>
							</form>
							<div className="absolute top-0 right-0">
								<div className="group relative flex">
									<i
										onClick={closeHandler}
										className="material-icons text-5xl text-rose-600 hover:text-rose-700 transition-all duration-300 cursor-pointer"
									>
										cancel
									</i>
									<span className="absolute top-12 -right-2 scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
										Close
									</span>
								</div>
							</div>
						</div>
					</div>
				</Dialog>
			</main>
			<Footer />
		</div>
	);
}

export default Payment;
