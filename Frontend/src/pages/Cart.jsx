import React, { useEffect } from "react";
import { setUser } from '../redux/features/authSlice';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setCart,
  removeProduct,
  increaseQty,
  decreaseQty,
} from "../redux/features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  // Get user and cart products from Redux store
  const auth = useSelector((state) => state.auth.user);
  const { products } = useSelector((state) => state.cart);

  // Extract userId safely (is user is logged in)
  const user = auth?.user;
  const userId = user?._id;

  // Sync cart from backend on load
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:8000/api/cart/${userId}`);
        // ensure cart exists and sync Redux store with backend data
        if (res.data && res.data.cart) {
          dispatch(setCart(res.data.cart.products));
        }
      } catch (err) {
        console.error("Error fetching cart:", err.message);
      }
    };
    fetchCart();
  }, [dispatch, userId]);

  // update backend cart whenever local state changes
  const updateCartInDB = async (updatedProducts) => {
    if (!userId) return;
    try {
      await axios.put(`http://localhost:8000/api/cart/${userId}`, {
        products: updatedProducts,
      });
    } catch (err) {
      console.error("Error updating cart:", err.message);
    }
  };

  // increase product quantity both in Redux and backend
  const handleIncrease = (product_id) => {
    dispatch(increaseQty(product_id));
    const updated = products.map((p) =>
      p.product_id === product_id ? { ...p, qty: p.qty + 1 } : p
    );
    updateCartInDB(updated);
  };

  // decrease product quantity if > 1
  const handleDecrease = (product_id) => {
    dispatch(decreaseQty(product_id));
    const updated = products.map((p) =>
      p.product_id === product_id ? { ...p, qty: p.qty - 1 } : p
    );
    updateCartInDB(updated);
  };

  // remove product completely from cart
  const handleRemove = (product_id) => {
    dispatch(removeProduct(product_id)); // local update
    const updated = products.filter((p) => p.product_id !== product_id);
    updateCartInDB(updated); // backend sync
  };

  console.log("User from Redux:", user);
  console.log("Extracted userId:", userId);

  if (!userId) {
    return (
      <div className="p-8 text-red-500 font-semibold">
        Please log in to view your cart
      </div>
    );
  }

  // show empty cart message if no products
  // if (!products.length) {
  //   return <div className="p-8 text-gray-600">Your cart is empty</div>;
  // }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {products.map((item) => (
        <div
          key={item.product_id}
          className="flex justify-between items-center mb-4 border-b pb-2"
        >
          <div>
            <div className="font-semibold">Product ID: {item.product_id}</div>
            <div className="text-sm text-gray-600">Quantity: {item.qty}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleIncrease(item.product_id)}
              className="px-2 py-1 bg-green-500 text-white rounded"
            >
              +
            </button>
            <button
              onClick={() => handleDecrease(item.product_id)}
              className="px-2 py-1 bg-yellow-500 text-white rounded"
            >
              -
            </button>
            <button
              onClick={() => handleRemove(item.product_id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
