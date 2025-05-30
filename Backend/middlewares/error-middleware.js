const errorHandler = (error, request, response, next) => {
  if (error) {
    return response.status(400).json({ error: error.message });
  } 
  
  next();
};

module.exports = { errorHandler };

