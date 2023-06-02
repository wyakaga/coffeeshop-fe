import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { getProductDetails } from "../../utils/https/product";
import { cartAction } from "../../redux/slices/cart";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";

function ProductDetail() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const token = useSelector((state) => state.auth.data.token);
	const selectedDelivery = useSelector((state) => state.cart.delivery);

	let { id } = useParams();

	const [dataProduct, setDataProduct] = useState([]);
	const [selectedSize, setSelectedSize] = useState(1);
	const [qty, setQty] = useState(1);
	const [time, setTime] = useState(null);
	const [isChanged, setIsChanged] = useState({ size: "" });
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getProductDetails(id)
			.then((res) => {
				setDataProduct(res["data"]["data"]);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, []);

	const onSizeChange = (e) => {
		setSelectedSize(e.target.value);
		setIsChanged({
			...isChanged,
			size: e.target.value,
		});
	};

	const onDeliveryChange = (e) => {
		if (!token) {
			navigate("/login");
			return;
		}

		dispatch(cartAction.deliveryMethod(e.target.value));
	};

	const increaseQtyHandler = () => {
		const newQty = qty + 1;
		setQty(newQty);
	};

	const decreaseQtyHandler = () => {
		if (qty === 1) {
			qty - 0;
			return;
		}
		const newQty = qty - 1;
		setQty(newQty);
	};

	const addToCartHandler = () => {
		const subtotal = dataProduct[0].price * qty;
		const shoppingCart = {
			product_id: parseInt(id),
			size_id: parseInt(selectedSize),
			qty,
			subtotal,
			img: dataProduct[0].img,
			productName: dataProduct[0].name,
		};

		if (!token) {
			navigate("/login");
			return;
		}

		dispatch(cartAction.addToCart(shoppingCart));
		toast.custom(
			() => (
				<div className="bg-first-brown/90 w-1/5 px-6 py-4 shadow-md rounded-md flex justify-center items-center gap-x-4 mt-10">
					<i className="material-icons text-white text-4xl">shopping_cart</i>
					<span className="font-poppins text-white text-2xl">Added to cart</span>
				</div>
			),
			{
				position: "top-center",
				duration: 3000,
			}
		);
	};

	document.title = dataProduct[0] ? dataProduct[0]["name"] : "Product details";

	return (
		<div className="body-wrapper grid grid-cols-1 grid-rows-1">
			{isLoading && <Loader />}
			<Header title="product" />
			<main className="bg-eighth-white relative pt-10 pb-40 px-12">
				<section className="main-wrapper flex flex-col lg:flex-row justify-center gap-20 lg:gap-60 py-12 px-10 lg:px-0">
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
									className="w-full h-full rounded-full object-cover object-center"
								/>
							</div>
							<div className="product-name-price text-center flex flex-col gap-y-4">
								<p className="font-poppins font-black text-6xl">
									{dataProduct[0] && dataProduct[0]["name"]}
								</p>
								<p className="font-poppins font-medium text-4xl">
									IDR {dataProduct[0] && dataProduct[0]["price"].toLocaleString("id-ID")}
								</p>
							</div>
						</div>
						<div className="utils-btn flex flex-col font-poppins font-bold text-2xl gap-y-6">
							<button
								onClick={addToCartHandler}
								disabled={isChanged.size === "" || selectedDelivery === "" || time === null}
								className="text-white hover:text-first-brown disabled:text-fifth-gray bg-first-brown hover:bg-first-yellow disabled:bg-gray-400 rounded-[20px] p-6 transition-colors duration-300"
							>
								Add to Cart
							</button>
							<button className="text-first-brown hover:text-white bg-first-yellow hover:bg-first-brown rounded-[20px] p-6 transition-colors duration-300">
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
									<div className="deliv-btn font-poppins w-[4.375rem] h-[4.375rem] flex justify-center items-center">
										<input
											type="radio"
											name="size"
											id="R"
											value={1}
											onChange={onSizeChange}
											className="peer hidden"
										/>
										<label
											htmlFor="R"
											className="flex justify-center items-center select-none cursor-pointer rounded-full w-full h-full text-3xl bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-yellow hover:bg-first-yellow peer-checked:text-black hover:text-black peer-checked:font-bold hover:font-bold transition-all duration-300"
										>
											<p className="text-center">R</p>
										</label>
									</div>
									<div className="deliv-btn font-poppins w-[4.375rem] h-[4.375rem] flex justify-center items-center">
										<input
											type="radio"
											name="size"
											id="L"
											value={2}
											onChange={onSizeChange}
											className="peer hidden"
										/>
										<label
											htmlFor="L"
											className="flex justify-center items-center select-none cursor-pointer rounded-full w-full h-full text-3xl bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-yellow hover:bg-first-yellow peer-checked:text-black hover:text-black peer-checked:font-bold hover:font-bold transition-all duration-300"
										>
											<p className="text-center">L</p>
										</label>
									</div>
									<div className="deliv-btn font-poppins w-[4.375rem] h-[4.375rem] flex justify-center items-center">
										<input
											type="radio"
											name="size"
											id="XL"
											value={3}
											onChange={onSizeChange}
											className="peer hidden"
										/>
										<label
											htmlFor="XL"
											className="flex justify-center items-center select-none cursor-pointer rounded-full w-full h-full text-3xl bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-yellow hover:bg-first-yellow peer-checked:text-black hover:text-black peer-checked:font-bold hover:font-bold transition-all duration-300"
										>
											<p className="text-center">XL</p>
										</label>
									</div>
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
										<input
											type="radio"
											name="delivery-method"
											id="dine-in"
											value={1}
											checked={parseInt(selectedDelivery) === 1}
											onChange={onDeliveryChange}
											className="peer hidden"
										/>
										<label
											htmlFor="dine-in"
											className="select-none cursor-pointer rounded-[10px] py-3 px-5 text-center bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-brown hover:bg-first-brown peer-checked:text-white hover:text-white peer-checked:font-bold hover:font-bold transition-all duration-300"
										>
											Dine in
										</label>
									</div>
									<div className="deliv-btn font-poppins">
										<input
											type="radio"
											name="delivery-method"
											id="pick-up"
											value={2}
											checked={parseInt(selectedDelivery) === 2}
											onChange={onDeliveryChange}
											className="peer hidden"
										/>
										<label
											htmlFor="pick-up"
											className="select-none cursor-pointer rounded-[10px] py-3 px-5 text-center bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-brown hover:bg-first-brown peer-checked:text-white hover:text-white peer-checked:font-bold hover:font-bold transition-all duration-300"
										>
											Pick up
										</label>
									</div>
									<div className="deliv-btn font-poppins">
										<input
											type="radio"
											name="delivery-method"
											id="door-delivery"
											value={3}
											checked={parseInt(selectedDelivery) === 3}
											onChange={onDeliveryChange}
											className="peer hidden"
										/>
										<label
											htmlFor="door-delivery"
											className="select-none cursor-pointer rounded-[10px] py-3 px-5 text-center bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-brown hover:bg-first-brown peer-checked:text-white hover:text-white peer-checked:font-bold hover:font-bold transition-all duration-300"
										>
											Door Delivery
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
									onFocus={(e) => (e.target.type = "time")}
									onBlur={(e) => (e.target.type = "text")}
									onChange={(e) => setTime(e.target.value)}
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
										className="w-full h-full rounded-full object-cover object-center"
									/>
								</div>
								<div className="info whitespace-nowrap">
									<p className="font-poppins font-bold text-2xl">
										{dataProduct[0] && dataProduct[0]["name"]}
									</p>
									<p className="font-poppins text-xl flex flex-nowrap">
										x{qty} (
										{parseInt(selectedSize) === 3
											? "Extra Large"
											: parseInt(selectedSize) === 2
											? "Large"
											: "Regular"}
										)
									</p>
								</div>
							</div>
							<div className="counter flex flex-row items-center justify-center gap-x-6">
								<div className="group relative flex">
									<button
										onClick={() => decreaseQtyHandler()}
										className="w-[40px] h-[40px] rounded-full bg-third-yellow hover:bg-first-yellow font-bold text-first-brown hover:text-black text-2xl flex items-center justify-center border-none transition-all duration-300"
									>
										<i className="material-icons font-black">remove</i>
									</button>
									<span className="absolute top-12 -right-12 scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
										Decrease quantities
									</span>
								</div>
								<div className="w-[40px] h-[40px] flex justify-center items-center">
									<p className="font-poppins font-bold text-2xl">{qty}</p>
								</div>
								<div className="group relative flex">
									<button
										onClick={() => increaseQtyHandler()}
										className="w-[40px] h-[40px] rounded-full bg-third-yellow hover:bg-first-yellow font-bold text-first-brown hover:text-black text-2xl flex items-center justify-center border-none transition-all duration-300"
									>
										<i className="material-icons font-black">add</i>
									</button>
									<span className="absolute top-12 -right-12 scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
										Increase quantities
									</span>
								</div>
							</div>
						</div>
						<div className="checkout-btn w-full">
							<button
								onClick={() => navigate("/payment")}
								disabled={isChanged.size === "" || selectedDelivery === "" || time === null}
								className="bg-first-yellow hover:bg-first-brown disabled:bg-gray-400 text-black hover:text-white disabled:text-fifth-gray border-none rounded-[20px] font-poppins font-bold text-2xl py-8 lg:py-16 lg:px-20 w-full transition-all duration-300"
							>
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
