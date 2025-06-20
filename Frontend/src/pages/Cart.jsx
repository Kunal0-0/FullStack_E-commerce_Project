import React, { useEffect, useRef } from "react";
import { setUser } from "../redux/features/authSlice";
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

  const didMount = useRef(false);
  const justFetched = useRef(false);

  console.log("Cart Render: user =", user);
  console.log("Cart Render: userId =", user?._id);

  // Sync cart from backend on load
  const fetchCart = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:8000/api/cart/${userId}`);
      console.log(res.data);
      console.log(res.data.products);
      // ensure cart exists and sync Redux store with backend data
      if (res.data && res.data.products) {
        justFetched.current = true;
        dispatch(setCart(res.data.products));
      }
    } catch (err) {
      console.error("Error fetching cart:", err.message);
    }
  };
  useEffect(() => {
    fetchCart();
  }, [dispatch, userId]);

  // update backend cart whenever local state changes
  const updateCartInDB = async () => {
    try {
      await axios.put(`http://localhost:8000/api/cart/${userId}`, {
        products: products,
      });
      console.log(products);
    } catch (err) {
      console.error("Error updating cart:", err.message);
    }
  };

  useEffect(() => {
    if (!userId) return;
    if (justFetched.current) {
      justFetched.current = false;
      return;
    }
    updateCartInDB();
  }, [products, userId]);

  // increase product quantity in Redux
  const handleIncrease = (product_id) => {
    dispatch(increaseQty(product_id));
  };

  // decrease product quantity if > 1
  const handleDecrease = (product_id) => {
    dispatch(decreaseQty(product_id));
  };

  // remove product completely from cart
  const handleRemove = (product_id) => {
    dispatch(removeProduct(product_id));
  };

  if (!user || !user._id) {
    return (
      <div className="p-8 text-red-500 font-semibold">
        Please log in to view your cart
      </div>
    );
  }

  // show empty cart message if no products
  if (!products.length) {
    return <div className="p-8 text-gray-600">Your cart is empty</div>;
  }

  const totalAmount = products.reduce((acc, item) => {
    return acc + item.product_id.price * item.qty;
  }, 0);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {products.map((item) => (
        <div
          key={item.product_id._id}
          className="flex justify-between items-center mb-4 border-b pb-2"
        >
          <div>
            <div className="font-semibold">
              Product Name: {item.product_id.name}
            </div>
            <div className="text-sm text-gray-600">Quantity: {item.qty}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleIncrease(item.product_id._id)}
              className="px-2 py-1 bg-green-500 text-white rounded"
            >
              +
            </button>
            <button
              onClick={() => handleDecrease(item.product_id._id)}
              className="px-2 py-1 bg-yellow-500 text-white rounded"
            >
              -
            </button>
            <button
              onClick={() => handleRemove(item.product_id._id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="text-xl font-semibold mb-4">
        Total: ₹{totalAmount.toFixed(2)};
      </div>
    </div>
  );
};

export default Cart;
