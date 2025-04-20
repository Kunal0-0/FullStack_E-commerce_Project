const Category = require("../models/category");

// create a new category
async function createCategory(req, res, next) {
  const { name, description } = req.body;

  if (!name || !description) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error);
  }
  const category = new Category({ name, description });
  await category.save();
  res
    .status(201)
    .json({ success: true, message: "Category created", category });
}

// Get all categories
async function getAllCategories(req, res, next) {
  const category = await Category.find();
  res.status(200).json(category);
}

// Update category
async function updateCategory(req, res, next) {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.categoryId,
    req.body,
    {
      new: true,
    }
  );
  if (!updatedCategory) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    return next(error);
  }
  res
    .status(200)
    .json({ success: true, message: "Category updated", updatedCategory });
}

// Delete a category
async function deleteCategory(req, res, next) {
  const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId);
  if (!deletedCategory) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({ message: "Category deleted" });
}

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
