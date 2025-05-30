const Favorites = require("../models/favorites");
const mongoose = require("mongoose");

// Add products to favorites
async function addToFavoritesService(userId, productIds) {
  const formattedIds = productIds.map((id) => new mongoose.Types.ObjectId(id));
  let favorite = await Favorites.findOne({ userId });

  if (!favorite) {
    favorite = new Favorites({ userId, products: formattedIds });
  } else {
    const existingProductIds = favorite.products.map((id) => id.toString());
    const newProducts = formattedIds.filter(
      (id) => !existingProductIds.includes(id.toString())
    );

    if (newProducts.length === 0) {
      return { error: "All products already in favorites" };
    }

    favorite.products.push(...newProducts);
  }

  const savedFavorite = await favorite.save();
  return { favorite: savedFavorite };
}

// Get all favorites for a user
async function getFavoritesService(userId) {
  return await Favorites.findOne({ userId }).populate("products");
}

// Remove a product from favorites
async function removeFromFavoritesService(userId, productId) {
  const favorite = await Favorites.findOne({ userId });

  if (!favorite) {
    return { error: "User has no favorite products" };
  }

  favorite.products = favorite.products.filter(
    (id) => id.toString() !== productId
  );

  if (favorite.products.length === 0) {
    await Favorites.findByIdAndDelete(favorite._id);
    return { message: "All favorite products removed" };
  }

  const updatedFavorite = await favorite.save();
  return { favorite: updatedFavorite };
}

module.exports = {
  addToFavoritesService,
  getFavoritesService,
  removeFromFavoritesService,
};
