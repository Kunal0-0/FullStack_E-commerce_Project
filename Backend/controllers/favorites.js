const Favorites = require("../models/favorites");
const mongoose = require("mongoose");

// addToFavorites
async function addToFavorites(req, res, next) {
  const { userId, product } = req.body;

  if (!userId || !product || !Array.isArray(product)) {
    const error = new Error("User ID and Product ID(s) are required");
    error.statusCode = 400;
    return next(error);
  }

  const productIds = product.map((id) => new mongoose.Types.ObjectId(id));
  let favorite = await Favorites.findOne({ userId });

  if (!favorite) {
    // Create new favorite doc
    favorite = new Favorites({ userId, products: productIds });
  } else {
    // Avoid duplicates
    const existingProductIds = favorite.products.map(id => id.toString());
    const newProducts = productIds.filter(
      (id) => !existingProductIds.includes(id.toString())
    );

    if (newProducts.length === 0) {
      const error = new Error("All products already in favorites");
      error.statusCode = 400;
      return next(error);
    }

    favorite.products.push(...newProducts);
  }

  await favorite.save();
  res.status(201).json({ message: "Added to favorites", favorite });
}

// Get all Favorites
async function getFavorites(req, res, next) {
  const { userId } = req.params;

  const favorite = await Favorites.findOne({ userId }).populate("products");

  if (!favorite || favorite.products.length === 0) {
    return res
      .status(200)
      .json({ message: "No favorites found", favorites: [] });
  }

  res.status(200).json(favorite);
}

// Delete Favorite
async function removeFromFavorites(req, res, next) {
  const { userId, product } = req.body;

  if (!userId || !product) {
    const error = new Error("User ID and Product ID are required");
    error.statusCode = 400;
    return next(error);
  }

  const favorite = await Favorites.findOne({ userId });

  if (!favorite) {
    const error = new Error("User has no favorite products");
    error.statusCode = 404;
    return next(error);
  }

  // Remove the product from the array
  favorite.products = favorite.products.filter((id) => id.toString() !== product);

  if (favorite.products.length === 0) {
    await Favorites.findByIdAndDelete(favorite._id);
    return res.status(200).json({ message: "All favorite products removed" });
  }

  await favorite.save();
  res.status(200).json({ message: "Product removed from favorites", favorite });
  
}

module.exports = {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
};
