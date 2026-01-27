const Review = require("../models/review.model");
const Product = require("../models/product.model");

// Add a review for a product and update product's rating & reviews count
const addReview = async (req, res) => {
  try {
    const productId = req.params.id;
    let { rating, comment, userId } = req.body;
    rating = Number(rating);

    if (isNaN(rating) || rating <= 0 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a number between 0.1 and 5",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const review = await Review.create({
      product: productId,
      user: userId || null,
      rating,
      comment: comment || "",
    });

    // populate user on the created review for response (if user exists)
    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "firstName lastName email"
    );

    // update product aggregate fields (reviews count & average rating)
    const oldCount = product.reviews || 0;
    const oldRating = product.rating || 0;
    const newCount = oldCount + 1;
    const newRating = (oldRating * oldCount + rating) / newCount;

    product.reviews = newCount;
    product.rating = newRating;
    await product.save();

    res.status(201).json({
      success: true,
      review: populatedReview || review,
      product: {
        _id: product._id,
        rating: product.rating,
        reviews: product.reviews,
      },
    });
  } catch (error) {
    console.error("Add Review Error:", error);
    res.status(500).json({ success: false, message: "Failed to add review" });
  }
};

// Get reviews for a product
const getReviews = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviews = await Review.find({ product: productId })
      .sort({ createdAt: -1 })
      .populate("user", "firstName lastName email");
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    console.error("Get Reviews Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
};

module.exports = {
  addReview,
  getReviews,
};

