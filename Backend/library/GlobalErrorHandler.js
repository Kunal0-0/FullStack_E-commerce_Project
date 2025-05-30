const { errorHandler } = require("../middlewares/error-middleware");

const catchAsync = (fn) => {
  return async (args, context, next) => {
    try {
      return await fn(args, context, next);
    } catch (error) {
      errorHandler(error, context?.request, context?.response, next);
    }
  };
};

module.exports = { catchAsync };