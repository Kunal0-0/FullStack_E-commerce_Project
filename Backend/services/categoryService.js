const Category = require("../models/category");

// Create a new category
async function createNewCategory(data) {
  const category = new Category(data);
  return await category.save();
}

// Get all categories
async function getCategories() {
  return await Category.find();
}

// Update a category by ID
async function updateCategoryById(categoryId, updateData) {
  return await Category.findByIdAndUpdate(categoryId, updateData, {
    new: true,
  });
}

// Delete a category by ID
async function deleteCategoryById(categoryId) {
  return await Category.findByIdAndDelete(categoryId);
}

module.exports = {
  createNewCategory,
  getCategories,
  updateCategoryById,
  deleteCategoryById,
};
