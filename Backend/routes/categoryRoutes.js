const express = require("express");
const router = express.Router();
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/category");

router
    .route("/")
    .get(getAllCategories)
    .post(createCategory)

router.route("/:categoryId").put(updateCategory).delete(deleteCategory)

module.exports = router;