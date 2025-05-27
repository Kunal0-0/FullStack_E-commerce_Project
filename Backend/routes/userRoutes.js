const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const customMiddleware = require("./middlewares/customMiddleware");
const {
  registerUser,
  handleGetAllUsers,
  handleGetUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Create User (Register)
router.post("/register", customMiddleware, registerUser);

// Read All Users
router.get("/", customMiddleware, handleGetAllUsers);

// Generate Access and Refresh Tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    "shhhh", // process.env.jwtsecret,
    {
      expiresIn: "2h",
    }
  );
  const refreshToken = jwt.sign({ id: user._id }, "abbbb", {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

// signup
router.post("/signup", customMiddleware, async (req, res) => {
  try {
    // get all data from body
    const { name, email, mobile_number, password } = req.body;

    // all the data should exists
    if (!(name && email && mobile_number && password)) {
      return res.status(400).send("All fields are compulsory");
    }

    // Check if user already exists by email or mobile
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .send("User already exists with this email or mobile number");
    }

    // encrypt the password
    const myEncPassword = await bcrypt.hash(password, 10);

    // save the user in DB
    const user = await User.create({
      name,
      password: myEncPassword,
      mobile_number,
      email,
    });

    // generate a token for user and send it
    const { accessToken, refreshToken } = generateTokens(user);
    user.token = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    user.password = undefined; // dont want to send password to frontend

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

// login
router.post("/login", customMiddleware, async (req, res) => {
  try {
    // get all data from frontend
    const { email, password } = req.body;

    // all the data should exists
    if (!(email && password)) {
      res.status(400).send("send all data");
    }

    // find user in DB
    const user = await User.findOne({ email });

    // If invalid credentials
    // match the password
    // await bcrypt.compare(password, user.password) // returns a boolean value
    // 1. Check if user exists
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    // 2. Check if password matchess
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    // if(user && (await bcrypt.compare(password, user.password))) {
    //     const token = jwt.sign(
    //         {id: user._id},

    //         'shhhh', // process.env.jwtsecret,

    //         {
    //             expiresIn: "2h"
    //         }
    //     )
    const { accessToken, refreshToken } = generateTokens(user);
    user.token = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    user.password = undefined;
    // send a token in user (cookie section)
    const options = {
      //expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Date.now() + no. of days you want cookie to be alive * hours(in 1 day) * min(in 1 hour) * sec(in 1 min) * milliseconds (1000 = 1ms)
      httpOnly: true, // server can only manipulate the cookie. User cannot manipulate it
      secure: true,
      sameSite: "strict",
    };
    res.status(200).cookie("refreshToken", refreshToken, options).json({
      success: true,
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

// token refresh route
router.post("/refresh", customMiddleware, async (req, res) => {
  try {
    if (req.cookies?.refreshToken) {
      // Destructuring refreshToken from cookie
      const refreshToken = req.cookies.refreshToken;

      // Verifying refresh Token
      const decoded = jwt.verify(refreshToken, "abbbb");
      const user = await User.findById(decoded.id);

      // Wrong Refesh Token
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).send("Invalid refresh token");
      }

      const { accessToken, refreshToken: newRefreshToken } =
        generateTokens(user);
      user.token = accessToken;
      user.refreshToken = newRefreshToken;
      await user.save();

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });
      res.status(200).json({ accessToken });
    }
  } catch (error) {
    return res.status(403).send("Invalid or expired refresh token");
  }
});

router
  .route("/:id")
  .get(handleGetUserById) // Read User by ID
  .put(updateUser) // Update User by ID
  .delete(deleteUser); // Delete User by ID

module.exports = router;
