const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function oAuth(req, res) {
  //const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);

  return res.json({ });
}

module.exports = { oAuth };
