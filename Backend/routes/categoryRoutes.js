const express = require("express");
const router = express.Router();
// const customMiddleware = require("./middlewares/customMiddleware");
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/category");
const { catchAsync } = require("../library/GlobalErrorHandler")

router
    .route("/")
    .get(catchAsync(getAllCategories))
    .post(catchAsync(createCategory))

router.route("/:categoryId").put(catchAsync(updateCategory)).delete(catchAsync(deleteCategory))

module.exports = router;