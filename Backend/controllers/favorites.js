const {
  addToFavoritesService,
  getFavoritesService,
  removeFromFavoritesService,
} = require("../services/favoriteService");

// Add To Favorites
async function addToFavorites(req, res, next) {
  const { userId, product } = req.body;

  // Ensure required fields are provided and that 'product' is an array
  if (!userId || !product || !Array.isArray(product)) {
    const error = new Error("User ID and Product ID(s) are required");
    error.statusCode = 400;
    return next(error);
  }

  // Add products to user's favorite list
  const productIds = await addToFavoritesService(userId, product);

  // If service returns an error, send a 400 Bad Request
  if (productIds.error) {
    const error = new Error(productIds.error);
    error.statusCode = 400;
    return next(error);
  }

  // Respond with success and the updated favorite list
  res
    .status(201)
    .json({ message: "Added to favorites", favorite: result.favorite });
}

// Get all Favorites
async function getFavorites(req, res, next) {
  // Fetch favorites by user ID passed in route params
  const favorite = await getFavoritesService(req.params.userId);

  // Handle the case where the user has no favorite products
  if (!favorite || favorite.products.length === 0) {
    return res.status(200).json({
      message: "No favorites found",
      favorites: [],
    });
  }

  // Return the list of favorite products
  res.status(200).json(favorite);
}

// Delete Favorite
async function removeFromFavorites(req, res, next) {
  const { userId, product } = req.body;

  // Ensure required data is provided before proceeding
  if (!userId || !product) {
    const error = new Error("User ID and Product ID are required");
    error.statusCode = 400;
    return next(error);
  }

  // Attempt to remove the specified product from user's favorites
  const favorite = await removeFromFavoritesService({ userId, product });

  // Handle cases where the product or user is not found
  if (favorite.error) {
    const error = new Error(favorite.error);
    error.statusCode = 404;
    return next(error);
  }

  // Send a success message with updated favorite list
  res.status(200).json({
    message: result.message || "Product removed from favorites",
    favorite: result.favorite,
  });
}

module.exports = {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
};
