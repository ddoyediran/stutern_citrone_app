const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom-error");

class UnauthenticatedError extends CustomError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
