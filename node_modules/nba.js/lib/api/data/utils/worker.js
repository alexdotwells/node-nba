'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.work = work;

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {};

/**
 * Make the request to the API, parse and format the JSON, and return it.
 * @param  {string}   endpoint - URL endpoint.
 * @param  {Function} cb - Error-first callback.
 */
function get(endpoint, cb) {
  (0, _fetch2.default)(endpoint).then(function (res) {
    return res.body;
  }).then(function (body) {
    return JSON.parse(body);
  }).then(function (json) {
    if (json.hasOwnProperty('_internal')) {
      delete json._internal;
    }

    return json;
  }).then(function (json) {
    return cb(null, json);
  }).catch(function (err) {
    return cb(Object.assign(err, {
      body: err.statusCode && err.statusMessage && err.response && err.response.body ? err.response.body : err.message
    }));
  });
}

/**
 * Make the request and return the response as a Promise + callback if provided.
 * @param  {string} endpoint - Encoded URL endpoint.
 * @param  {Function} cb - Optional error-first callback for the response/error.
 * @return {Promise} Promise containing JSON response.
 */
function work(endpoint) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

  return new Promise(function (resolve, reject) {
    get(endpoint, function (err, res) {
      if (err) {
        if (cb) cb(err);
        reject(err);
        return;
      }

      if (cb) cb(null, res);
      resolve(res);
    });
  });
}