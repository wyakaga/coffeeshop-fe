import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	delivery: "",
	cart: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		deliveryMethod: (prevState, action) => {
			return { ...prevState, delivery: action.payload };
		},
		addToCart: (prevState, action) => {
			const itemInCart = prevState.cart.find(
				(item) =>
					item.product_id === action.payload.product_id && item.size_id === action.payload.size_id
			);
			if (itemInCart) {
				itemInCart.qty + action.payload.qty;
				itemInCart.subtotal + action.payload.subtotal;
			} else {
				prevState.cart.push({ ...action.payload });
			}
		},
		removeFromCart: (prevState, action) => {
			const removedCart = prevState.cart.filter(
				(item) => item.product_id !== action.payload.product_id
			);
			prevState.cart = removedCart;
		},
		resetCart: () => {
			return initialState;
		},
	},
});

export const cartAction = { ...cartSlice.actions };
export default cartSlice.reducer;
