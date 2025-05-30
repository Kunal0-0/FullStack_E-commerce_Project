const express = require("express");
const router = express.Router();
// const customMiddleware = require("./middlewares/customMiddleware");
const { addAddress, getAddress, updateAddress, deleteAddress } = require("../controllers/address");
const { catchAsync } = require("../library/GlobalErrorHandler")

router.post("/", catchAsync(addAddress));
router.get("/:userId", catchAsync(getAddress));
router
    .route("/:addressId")
    .put(catchAsync(updateAddress))
    .delete(catchAsync(deleteAddress));

module.exports = router;