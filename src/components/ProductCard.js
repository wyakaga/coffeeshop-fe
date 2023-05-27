/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

function ProductCard({id, src, name, price}) {
	return (
		<div
			className="products-wrapper flex flex-col items-center bg-white pt-0 pb-6 px-3 rounded-[30px] shadow-[0px_30px_60px_rgba(57,57,57,0.1)] relative cursor-pointer transition-transform duration-300 hover:transform hover:translate-y-[-1rem]"
		>
			<Link to={`detail/${id}`} className="flex flex-col items-center">
				<div className="w-[8.938rem] h-[8.938rem] rounded-full transform translate-y-[-35%]">
					<img
						src={src}
						alt="product image"
						className="w-full h-full rounded-full object-cover object-center"
					/>
				</div>
				<p className="m-0 text-center font-poppins font-black text-[1.375rem]">{name}</p>
				<p className="m-0 text-center font-poppins font-bold text-[1.063rem] text-first-brown">
					IDR {price.toLocaleString("id-ID")}
				</p>
			</Link>
		</div>
	);
}

export default ProductCard;
