import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Reviews, { StarRatingDisplay } from "../components/Reviews";
import { BsCart4 } from "react-icons/bs";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(res.data.data || res.data.product || res.data);
      } catch (err) {
        console.error("Failed to load product", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleProductUpdate = (agg) => {
    // agg contains { _id, rating, reviews }
    setProduct((p) => ({ ...p, rating: agg.rating, reviews: agg.reviews }));
  };

  if (loading) return <div className="py-20 text-center">Loading product...</div>;
  if (error || !product) return <div className="py-20 text-center text-red-500">Failed to load product</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white border rounded p-4">
        <div className="flex gap-6">
          <div className="w-1/3">
            <img
              src={product.image?.startsWith("http") ? product.image : `http://localhost:3000${product.image}`}
              alt={product.name}
              className="w-full object-contain h-64"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <StarRatingDisplay value={Number(product.rating || 0)} />
              <span className="text-sm text-gray-500">({product.reviews || 0} reviews)</span>
            </div>
            <div className="mt-4 text-lg font-semibold">${product.price} / {product.unit}</div>
            <div className="mt-4 text-gray-700">{product.categoryName}</div>
            <div className="mt-6">
              <button className="flex items-center gap-2 border border-green-500 text-green-600 rounded-lg py-2 px-4 hover:bg-green-500 hover:text-white">
                <BsCart4 /> Add to cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{product.description || "No description provided."}</p>
        </div>
      </div>

      <aside className="bg-white border rounded p-4">
        <Reviews productId={product._id} onProductUpdate={handleProductUpdate} />
      </aside>
    </div>
  );
};

export default ProductDetail;

