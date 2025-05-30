const {
  createNewCategory,
  getCategories,
  updateCategoryById,
  deleteCategoryById,
} = require("../services/categoryService");

// create a new category
async function createCategory(req, res, next) {
  const { name, description } = req.body;

  // Validate input - name and description are mandatory to create a category
  if (!name || !description) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error);
  }

  // Create the category using the service method
  const category = await createNewCategory({ name, description });

  // Return 201 status with the created category data
  res
    .status(201)
    .json({ success: true, message: "Category created", category });
}

// Get all categories
async function getAllCategories(req, res, next) {
  // Fetch all categories from the database
  const category = await getCategories();

  // Return the list of categories
  res.status(200).json(category);
}

// Update category
async function updateCategory(req, res, next) {
   // Update the category identified by categoryId with new data
  const updatedCategory = await updateCategoryById(
    req.params.categoryId,
    req.body
  );

  // If no category is found to update, return a 404 error
  if (!updatedCategory) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    return next(error);
  }

  // Return the updated category to the client
  res
    .status(200)
    .json({ success: true, message: "Category updated", updatedCategory });
}

// Delete a category by ID
async function deleteCategory(req, res, next) {
  // Attempt to delete the category specified by categoryId
  const deletedCategory = await deleteCategoryById(req.params.categoryId);

  // If no category is found to delete, respond with a 404 error
  if (!deletedCategory) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    return next(error);
  }

  // Confirm successful deletion to the client
  res.status(200).json({ message: "Category deleted" });
}

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
