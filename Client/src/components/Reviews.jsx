import { useEffect, useState } from "react";
import axios from "axios";

const Star = ({ onClick }) => (
  <button type="button" onClick={onClick} className="text-xl text-gray-300 mr-1">
    ★
  </button>
);

const StarRatingDisplay = ({ value, size = 18, color = "#16a34a" }) => {
  const percent = Math.max(0, Math.min(100, (value / 5) * 100));
  const styleOuter = { fontSize: size, color: "#e5e7eb", lineHeight: 1 };
  const styleInner = {
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "hidden",
    width: `${percent}%`,
    whiteSpace: "nowrap",
    color,
    pointerEvents: "none",
  };

  return (
    <div style={{ position: "relative", display: "inline-block", lineHeight: 1 }}>
      <span style={styleOuter}>★★★★★</span>
      <span style={styleInner}>★★★★★</span>
    </div>
  );
};

const Reviews = ({ productId, onProductUpdate }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // form
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!productId) return;
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/api/products/${productId}/reviews`);
        setReviews(res.data.data || []);
      } catch (err) {
        console.error("Failed to load reviews", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId) return;
    if (isNaN(rating) || rating <= 0 || rating > 5)
      return alert("Please select rating between 0.1 and 5");

    try {
      setSubmitting(true);
      const res = await axios.post(`http://localhost:3000/api/products/${productId}/reviews`, {
        rating,
        comment,
      });

      // add new review returned (res.data.review) to top of list
      const newReview = res.data.review;
      setReviews((prev) => [newReview, ...prev]);

      // notify parent with new product aggregate if available
      if (onProductUpdate && res.data.product) {
        onProductUpdate(res.data.product);
      }

      // reset form
      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Failed to submit review", err);
      alert("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Customer Reviews</h3>

      <form onSubmit={handleSubmit} className="bg-white border rounded p-4">
        <div className="mb-2">
          <label className="block text-sm text-gray-600 mb-1">Your rating</label>
          <div className="flex items-center gap-3">
            <div
              role="button"
              onClick={() => setRating(0)}
              className="text-sm text-gray-500 cursor-pointer"
            >
              Clear
            </div>
            <div className="flex items-center">
              {/* clickable integer stars */}
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className="text-xl text-gray-300 mr-1"
                >
                  ★
                </button>
              ))}
            </div>
            <div className="ml-2 text-sm text-gray-500">
              <StarRatingDisplay value={rating} />
              <span className="ml-2">{rating.toFixed(1)} / 5</span>
            </div>
          </div>

          <div className="mt-3">
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review (optional)"
          className="w-full border rounded p-2 mb-2"
          rows={3}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>

      <div className="bg-white border rounded p-4">
        {loading ? (
          <div>Loading reviews...</div>
        ) : error ? (
          <div className="text-red-500">Failed to load reviews</div>
        ) : reviews.length === 0 ? (
          <div className="text-gray-500">No reviews yet — be the first!</div>
        ) : (
          <ul className="space-y-3">
            {reviews.map((r) => (
              <li key={r._id} className="border-b pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="font-medium mr-3">
                      {r.user ? r.user.name || "User" : "Anonymous"}
                    </div>
                    <div>
                      <StarRatingDisplay value={Number(r.rating || 0)} size={16} color="#f59e0b" />
                      <span className="ml-2 text-sm text-gray-600">{Number(r.rating).toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {r.comment && <p className="mt-1 text-sm text-gray-700">{r.comment}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Reviews;
export { StarRatingDisplay };

