import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { setCart } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/features/cartSlice";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);
  const user = auth?.user;
  const userId = user?._id;

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products");
      console.log(res);
      setProducts(res.data);
    } catch (err) {
      console.error("Error Fetching Products", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchCartFromBackend = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/cart/${userId}`);
      if(res.data && res.data.products) {
        dispatch(setCart(res.data.products));
      }
    } catch (err) {
      console.error("Error fetching cart:", err.message)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchCartFromBackend();
    }
  }, [userId])

  const cart = useSelector((state) => state.cart.products);
  const didMount = useRef(false);

  const syncCartToBackend = async () => {
    try {
      await axios.put(`http://localhost:8000/api/cart/${userId}`, {
        products: cart,
      });
      console.log(products);
    } catch (err) {
      console.error("Error syncing cart:", err.message);
    }
  };

  useEffect(() => {
    if (!userId) return;
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    syncCartToBackend();
  }, [cart]);

  useEffect(() => {
    if(userId) {
      didMount.current = true;
    }
  }, [userId])

  const handleAddToCart = (product) => {
    if (!user || !userId) {
      alert("Please log in to add products to your cart.");
      return;
    }
    dispatch(addProduct({ product_id: product, qty: 1 }));
  };

  console.log(products);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Available Products</h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-2xl shadow hover:shadow-md transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            {userId && (
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 px-4 py-2 bg-yellow-600 rounded text-white hover:bg-red-700 cursor-pointer"
              >
                Add to cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
