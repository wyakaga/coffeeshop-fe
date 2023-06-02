import React from "react";

function EmptyCart() {
	return (
		<div  className="flex items-center justify-center gap-x-5">
      <i className="material-icons text-3xl">remove_shopping_cart</i>
      <p className="font-poppins font-bold text-2xl">No products in your cart</p>
		</div>
	);
}

export default EmptyCart;
