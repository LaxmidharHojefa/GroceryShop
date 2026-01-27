const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const { 
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct, 
  getPopularProducts,
  getDealOfTheWeekProducts,
} = require("../controllers/product.controller.js");
const { addReview, getReviews } = require("../controllers/review.controller");

// GET all product
router.get("/", getAllProducts);

// GET All Popular Products
router.get("/popular", getPopularProducts);

// GET All Deal of the Week Products
router.get("/deals", getDealOfTheWeekProducts);

// Product reviews
router.get("/:id/reviews", getReviews);
router.post("/:id/reviews", addReview);

// GET single product
router.get("/:id", getSingleProduct);

// CREATE product
router.post("/", upload.single("image"), createProduct);

// UPDATE product
router.put("/:id", upload.single("image"), updateProduct);

// DELETE product
router.delete("/:id", deleteProduct);

module.exports = router;
