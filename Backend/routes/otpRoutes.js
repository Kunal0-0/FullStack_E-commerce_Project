const express = require("express");
const router = express.Router();


const {
  checkUser
} = require('../controllers/otp')

router.post("/send", checkUser);

module.exports = router;