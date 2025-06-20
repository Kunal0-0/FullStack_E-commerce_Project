import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [], // stores all cart items with product_id and qty
    status: "idle",
  },
  reducers: {
    setCart(state, action) {
      // sets the cart from backend data during initial load or sync
      state.products = action.payload;
    },
    // adds a new product or increases quantity if product already exists
    addProduct(state, action) {
      const { product_id, qty } = action.payload;
      const id = product_id._id || product_id; // fallback in case only ID is passed

      const existing = state.products.find(
        (p) => p.product_id._id === id
      );
      if (existing) {
        existing.qty += qty; // if product already in cart, just increase qty
      } else {
        state.products.push({ product_id, qty }); // otherwise add new product with qty
      }
      console.log("Existing cart:", state.products);
      console.log("Adding product:", product_id);
    },
    // removes a product from the cart entirely
    removeProduct(state, action) {
      state.products = state.products.filter(
        (p) => p.product_id._id !== action.payload
      );
    },
    // increases the quantity of a specific product
    increaseQty(state, action) {
      const item = state.products.find(
        (p) => p.product_id._id === action.payload
      );
      if (item) item.qty += 1;
    },
    // decreases the quantity of a product only if it's more than 1
    decreaseQty(state, action) {
      const item = state.products.find(
        (p) => p.product_id._id === action.payload
      );
      if (item && item.qty > 1) item.qty -= 1;
    },
  },
});

export const { setCart, addProduct, removeProduct, increaseQty, decreaseQty } =
  cartSlice.actions;
export default cartSlice.reducer;
