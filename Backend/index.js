const express = require("express")
const mongoose = require("mongoose");
require('dotenv').config();

// Access the environment variable
const mongoURI = process.env.MONGODB_URI;

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const addressRoutes = require("./routes/addressRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const orderRoutes = require("./routes/orderRoutes");
const otpRoutes = require("./routes/otpRoutes")

const errorHandler = require("./middlewares/errorHandler")

const cors = require("cors")
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
}));
app.options("*", cors());

mongoose.connect(mongoURI)
.then(() => console.log("DB Connected"))
.catch(err => console.error(err));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/otp", otpRoutes);

// if any unknown route is being accessed
// app.all('*', (req, res, next) => {
//     const err = new Error(`Can't find ${req.originalUrl} on the server!`);
//     err.status = 'fail';
//     err.statusCode = 404;

//     next(err);
// })
// Global Error Handler middleware
// app.use((error, req, res, next) => {
//     error.statusCode = error.statusCode || 500;
//     error.status = error.status || 'error'
//     res.status(error.statusCode).json({
//         status: error.statusCode,
//         message: error.message
//     })
// }) 

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))