const Category = require("../models/category.model");

/* =====================================================
   @desc    Get all active categories (Home Page)
   @route   GET /api/categories
   @access  Public
===================================================== */
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

/* =====================================================
   @desc    Get single category by ID
   @route   GET /api/categories/:id
   @access  Public
===================================================== */
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category || !category.isActive) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Get Category By ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch category",
    });
  }
};

/* =====================================================
   @desc    Create new category (Admin)
   @route   POST /api/categories
   @access  Admin
===================================================== */
const createCategory = async (req, res) => {
  try {
    const { name, totalItems } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Category image is required",
      });
    }

    // image path saved in DB
    const imagePath = `/images/categories/${req.file.filename}`;

    const category = await Category.create({
      name,
      totalItems,
      image: imagePath,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
};


/* =====================================================
   @desc    Update category (Admin)
   @route   PUT /api/categories/:id
   @access  Admin
===================================================== */
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
};

/* =====================================================
   @desc    Delete category (Admin – Hard delete)
   @route   DELETE /api/categories/:id
   @access  Admin
===================================================== */
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(
      req.params.id,
    //   { isActive: false }, // soft delete
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};


module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };


