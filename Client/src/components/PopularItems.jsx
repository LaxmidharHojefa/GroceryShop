import MaskGroup from "../assets/MaskGroup.png";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeartSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import axios from "axios";

const PopularItems = () => {
  const [wishlist, setWishlist] = useState({});
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/popular`);
        const data = (res.data && res.data.data) || [];
        setProducts(data.slice(0, 8));
      } catch (err) {
        console.error("Failed to fetch popular products", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  return (
    <section className="max-w-[1320px] mx-auto px-4 py-10">
      {/* SECTION TITLE */}
      <h2 className="text-xl font-semibold mb-6">Popular Items</h2>

      {/* GRID → always 4 cards per row on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">Loading...</div>
        ) : error ? (
          <div className="col-span-full text-center py-8 text-red-500">
            Failed to load popular items
          </div>
        ) : (
          products.map((item) => (
            <div
              key={item._id}
            // flex column for proper spacing
            className="relative bg-white border rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition"
          >
            {/* BADGE */}
              {item.badge && (
              <span
                style={{ backgroundColor: item.bg }}
                className="absolute top-3 left-3 text-xs font-semibold text-white px-2 py-1 rounded"
              >
                {item.badge}
              </span>
            )}

            {/* WISHLIST BUTTON */}
            <button
              onClick={() => toggleWishlist(item._id)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full border flex items-center justify-center text-gray-400 hover:text-red-500 transition"
            >
              {wishlist[item._id] ? (
                <IoHeartSharp className="text-red-500" />
              ) : (
                <IoMdHeartEmpty />
              )}
            </button>

            {/* IMAGE */}
            {/* consistent height */}
            <div className="h-36 flex items-center justify-center mb-3">
              <img
                src={
                  item.image && (item.image.startsWith("http") || item.image.startsWith("data:"))
                    ? item.image
                    : item.image
                    ? `${import.meta.env.VITE_API_URL}${item.image}`
                    : MaskGroup
                }
                alt={item.name}
                className="h-full object-contain"
              />
            </div>

            {/* NAME */}
            <h3 className="text-sm font-medium">{item.name}</h3>

            {/* RATING */}
            <div className="flex items-center gap-1 text-green-500 text-xs mt-1">
              {"★".repeat(Math.round(item.rating || 0))}
              <span className="text-gray-400 ml-1">
                ({item.reviews || 0} Review)
              </span>
            </div>

            {/* PRICE + STOCK */}
            <div className="mt-2">
              {/* price row */}
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-gray-900">
                  ${item.price}
                  <span className="text-sm font-normal text-gray-500">
                    {" "} / {item.unit}
                  </span>
                </span>

                <span
                  className={`text-sm ${
                    item.inStock ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* old price below */}
              {item.oldPrice && (
                <div className="text-sm text-red-500 line-through mt-1">
                  ${item.oldPrice} / {item.unit}
                </div>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center border rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition border rounded-lg"
                >
                  −
                </button>

                <span className="w-10 text-center text-sm font-medium text-gray-700">
                  {quantities[item._id] || 0}
                </span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition border rounded-lg"
                >
                  +
                </button>
              </div>

              <button
                disabled={!item.inStock}
                className={`flex items-center justify-center gap-2 flex-1
                  text-sm font-medium px-4 py-2 rounded-lg border transition-all duration-200
                  ${
                    item.inStock
                      ? "border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                      : "border-gray-300 text-gray-400 cursor-not-allowed bg-gray-100"
                  }`}
              >
                <BsCart4 className="text-base" />
                <span>Cart</span>
              </button>
            </div>

            {/* OUT OF STOCK OVERLAY */}
            {!item.inStock && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl">
                <span className="border border-red-400 text-red-500 px-4 py-1 rounded">
                  Out Of Stock
                </span>
              </div>
            )}
          </div>
          ))
        )}
      </div>
    </section>
  );
};

export default PopularItems;


