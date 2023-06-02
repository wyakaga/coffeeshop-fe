/* eslint-disable react/prop-types */
import React from "react";

function CartCard({ item }) {
	return (
		<div className="lg:flex lg:flex-row lg:items-center md:grid md:grid-cols-2">
			<img src={item.img} className="order-img w-[82px] h-[90px] rounded-[20px] mr-8" />
			<div className="order-info font-poppins font-normal text-xl lg:mr-auto">
				<div className="product">{item.productName}</div>
				<div className="qty-price flex flex-row justify-between">
					<p>x {item.qty}</p>
					<p className="lg:hidden">IDR {item.subtotal.toLocaleString("id-ID")}</p>
				</div>
				<div className="size">
					{parseInt(item.size_id) === 3
						? "Extra Large"
						: parseInt(item.size_id) === 2
						? "Large"
						: "Regular"}
				</div>
			</div>
			<p className="hidden lg:block font-poppins font-normal text-xl">
				IDR {item.subtotal.toLocaleString("id-ID")}
			</p>
		</div>
	);
}

export default CartCard;
