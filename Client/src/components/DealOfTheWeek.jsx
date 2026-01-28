import { useEffect, useState } from "react";
import DealTimer from "./DealTimer";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeartSharp } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import axios from "axios";
import MaskGroup from "../assets/MaskGroup.png";
import { Link } from "react-router-dom";
import Reviews, { StarRatingDisplay } from "./Reviews";

const DealOfTheWeek = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [wishlist, setWishlist] = useState({});
  const [quantities, setQuantities] = useState({});
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const visibleCount = 3;

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => {
        const len = Math.max(deals.length, 1);
        return prev + 1 >= len ? 0 : prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [deals.length]);

  // fetch deals from server
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/deals`);
        const data = (res.data && res.data.data) || [];
        setDeals(data); 
      } catch (err) {
        console.error("Failed to fetch deals", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const increaseQty = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const source = deals.length ? deals : [];
  const doubled = [...source, ...source];
  const visibleProducts = doubled.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="max-w-[1320px] max-h-[495px] mx-auto px-4 py-10">
      <h2 className="text-xl font-semibold mb-6">Deal Of The Week</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">Loading...</div>
        ) : error ? (
          <div className="col-span-full text-center py-8 text-red-500">
            Failed to load deals
          </div>
        ) : (
          visibleProducts.map((item, index) => (
            <div
              key={`${item._id}-${index}`}
              className="relative bg-white border rounded-xl p-3 hover:shadow-md transition"
            >
            {/* badge */}
            {item.badge && (() => {
              const b = String(item.badge);
              const isPercent = b.includes("%");
              const isHot = b.toLowerCase().includes("hot");
              const badgeColor = isPercent ? "bg-green-500" : isHot ? "bg-red-500" : "bg-gray-500";
              return (
                <span className={`${badgeColor} absolute top-3 left-3 text-xs font-semibold text-white px-2 py-1 rounded`}>
                  {b}
                </span>
              );
            })()}

            {/* wishlist */}
            <button
              onClick={() => toggleWishlist(item._id)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full border flex items-center justify-center"
            >
              {wishlist[item._id] ? (
                <IoHeartSharp className="text-red-500" />
              ) : (
                <IoMdHeartEmpty />
              )}
            </button>

            {/* image */}
            <Link to={`/product/${item._id}`} className="block">
              <div className="h-40 flex items-center justify-center">
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
            </Link>

            {/* timer */}
            <DealTimer endTime={item.dealEndTime} />

            {/* info */}
            <div className="bg-gray-50 px-3 py-3 mt-3 rounded-lg">
            <h3 className="text-sm font-medium">{item.name}</h3>

            <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  {/* <StarRatingDisplay value={Number(item.rating || 0)} size={14} color="#16a34a" /> */}
                  <div className="flex items-center gap-1 text-green-500 text-xs mt-1">
                    {"★".repeat(Math.round(item.rating || 0))}
                    <span className="text-gray-400 ml-1">
                      ({item.reviews || 0} Review)
                    </span>
                  </div>
                  {/* <span className="text-sm text-gray-500">({item.reviews || 0})</span> */}
                </div>
                <span className="text-sm font-semibold">
                ${item.price.toFixed(2)} / {item.unit}
                </span>
            </div>
            </div>

            {/* qty + cart */}
            <div className="flex items-center gap-10 mt-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="w-8 h-8 border rounded-lg"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm">
                  {quantities[item._id] || 0}
                </span>
                <button
                  onClick={() => increaseQty(item._id)}
                  className="w-8 h-8 border rounded-lg"
                >
                  +
                </button>
              </div>

              <button className="flex-1 flex items-center justify-center gap-2 border border-green-500 text-green-600 rounded-lg py-2 hover:bg-green-500 hover:text-white">
                <BsCart4 /> Cart
              </button>
            </div>
          </div>
        ))
      )}
      </div>
    </section>
  );
};

export default DealOfTheWeek;

