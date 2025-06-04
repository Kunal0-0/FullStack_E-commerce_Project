const express = require("express");
const router = express.Router();
// const customMiddleware = require("./middlewares/customMiddleware");
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/category");
// const { catchAsync } = require("../library/GlobalErrorHandler")

router
    .route("/")
    .get((getAllCategories))
    .post((createCategory))

router.route("/:categoryId").put((updateCategory)).delete((deleteCategory))

module.exports = router;