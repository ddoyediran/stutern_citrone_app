const createUserPayload = require("./createUserPayload");
const { attachCookiesToResponse } = require("./jwt");

module.exports = {
  createUserPayload,
  attachCookiesToResponse,
};
