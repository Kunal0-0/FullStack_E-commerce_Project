const express = require("express");
const router = express.Router();
const customMiddleware = require("./middlewares/customMiddleware");
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/category");

router
    .route("/", customMiddleware)
    .get(getAllCategories)
    .post(createCategory)

router.route("/:categoryId", customMiddleware).put(updateCategory).delete(deleteCategory)

module.exports = router;