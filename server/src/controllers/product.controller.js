const Category = require("../models/category.model");
const Product = require("../models/product.model");
/**
 * ============================
 * GET ALL PRODUCTS
 * ============================
 * /api/products
 */
const getAllProducts = async (req, res) => {
  try {
    const { isDeal, limit } = req.query;

    const filter = {};
    if (isDeal === "true") {
      filter.isDeal = true;
    }

    const products = await Product.find(filter)
      .limit(Number(limit) || 0)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/**
 * ============================
 * GET SINGLE PRODUCT
 * ============================
 * /api/products/:id
 */
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get Single Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

/**
 * ============================
 * CREATE PRODUCT
 * ============================
 * /api/products
 * multipart/form-data
 */
const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      // category,
      categoryName,
      price,
      oldPrice,
      unit,
      rating,
      reviews,
      inStock,
      isPopular,
      badge,
      isDeal,
      dealEndTime,
      isActive
    } = req.body;

    // image validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    // FIND CATEGORY BY NAME
    const categoryDoc = await Category.findOne({ name: categoryName });

    if (!categoryDoc) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    if (isDeal === "true" && !dealEndTime) {
      return res.status(400).json({
        success: false,
        message: "dealEndTime is required when isDeal is true",
      });
    }

    const imagePath = `/images/products/${req.file.filename}`;

    const product = await Product.create({
      name,
      image: imagePath,
      category: categoryDoc._id,
      categoryName: categoryName,
      price,
      oldPrice,
      unit,
      rating,
      reviews,
      inStock,
      isPopular,
      badge,
      isDeal,
      dealEndTime: isDeal ? dealEndTime : null,
      isActive
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

/**
 * ============================
 * UPDATE PRODUCT
 * ============================
 * /api/products/:id
 */
const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/images/products/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

/**
 * ============================
 * DELETE PRODUCT
 * ============================
 * /api/products/:id
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

/* =====================================================
   @desc    Get Popular Items (Home Page)
   @route   GET /api/products/popular
   @access  Public
===================================================== */
const getPopularProducts = async (req, res) => {
  try {
    const popularItems = await Product.find({
      isPopular: true,
      isActive: true,
    }); 
    // .limit(10) // adjust as needed

    res.status(200).json({
      success: true,
      count: popularItems.length,
      data: popularItems,
    });
  } catch (error) {
    console.error("Get Popular Items Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch popular items",
    });
  }
};

/* =====================================================
   @desc    GET DEAL OF THE WEEK (Home Page)
   @route   GET /api/products/deals
   @access  Public
===================================================== */

const getDealOfTheWeekProducts = async (req, res) => {
  try {
    const deals = await Product.find({
      isDeal: true,
      inStock: true,
      dealEndTime: { $gt: new Date() }, // ⏱ active deals only
    });
    // .limit(10) // adjust as needed

    res.status(200).json({
      success: true,
      count: deals.length,
      data: deals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch deal of the week",
    });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getPopularProducts,
  getDealOfTheWeekProducts,
};


