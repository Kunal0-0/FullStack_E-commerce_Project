const express = require("express");
const router = express.Router();
// const customMiddleware = require("./middlewares/customMiddleware");
const { addAddress, getAddress, updateAddress, deleteAddress } = require("../controllers/address");
// const { catchAsync } = require("../library/GlobalErrorHandler")

router.post("/", (addAddress));
router.get("/:userId", (getAddress));
router
    .route("/:addressId")
    .put((updateAddress))
    .delete((deleteAddress));

module.exports = router;