'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JwtGenerator = function () {
	function JwtGenerator() {
		_classCallCheck(this, JwtGenerator);
	}

	_createClass(JwtGenerator, [{
		key: 'generate',

		/**
   * Generate a JSON Web Token (JWT).
   *
   * @param {Buffer} cert - the private key certificate to be used when signing
   *		the claims.
   * @param {Object} claims - additional claims to include within the generated
   * 		JWT.
   *
   * @returns {String} the generated token
   */
		value: function generate(cert) {
			var claims = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			if (!cert instanceof Buffer) {
				throw new Error('cert must be of type Buffer');
			}
			if ((typeof claims === 'undefined' ? 'undefined' : _typeof(claims)) !== 'object') {
				throw new Error('claims must be of type object');
			}

			var toSign = {
				'iat': claims.issuedAt || parseInt(Date.now() / 1000, 10),
				'jti': claims.jti || _uuid2.default.v1()
			};
			Object.keys(claims).forEach(function (key) {
				toSign[key] = claims[key];
			});

			var token = _jsonwebtoken2.default.sign(toSign, cert, { algorithm: 'RS256' });
			return token;
		}
	}]);

	return JwtGenerator;
}();

module.exports = JwtGenerator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Kd3RHZW5lcmF0b3IuanMiXSwibmFtZXMiOlsiSnd0R2VuZXJhdG9yIiwiY2VydCIsImNsYWltcyIsIkJ1ZmZlciIsIkVycm9yIiwidG9TaWduIiwiaXNzdWVkQXQiLCJwYXJzZUludCIsIkRhdGUiLCJub3ciLCJqdGkiLCJ2MSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwidG9rZW4iLCJzaWduIiwiYWxnb3JpdGhtIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFTUEsWTs7Ozs7Ozs7QUFDTDs7Ozs7Ozs7OzsyQkFVU0MsSSxFQUFtQjtBQUFBLE9BQWJDLE1BQWEsdUVBQUosRUFBSTs7QUFDM0IsT0FBRyxDQUFDRCxJQUFELFlBQWlCRSxNQUFwQixFQUE0QjtBQUMzQixVQUFNLElBQUlDLEtBQUosQ0FBVSw2QkFBVixDQUFOO0FBQ0E7QUFDRCxPQUFHLFFBQU9GLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBckIsRUFBK0I7QUFDOUIsVUFBTSxJQUFJRSxLQUFKLENBQVUsK0JBQVYsQ0FBTjtBQUNBOztBQUVELE9BQUlDLFNBQVM7QUFDWixXQUFPSCxPQUFPSSxRQUFQLElBQW1CQyxTQUFTQyxLQUFLQyxHQUFMLEtBQVcsSUFBcEIsRUFBMEIsRUFBMUIsQ0FEZDtBQUVaLFdBQU9QLE9BQU9RLEdBQVAsSUFBYyxlQUFLQyxFQUFMO0FBRlQsSUFBYjtBQUlBQyxVQUFPQyxJQUFQLENBQVlYLE1BQVosRUFBb0JZLE9BQXBCLENBQTRCLFVBQUNDLEdBQUQsRUFBUztBQUNwQ1YsV0FBT1UsR0FBUCxJQUFjYixPQUFPYSxHQUFQLENBQWQ7QUFDQSxJQUZEOztBQUlBLE9BQUlDLFFBQVEsdUJBQUlDLElBQUosQ0FBU1osTUFBVCxFQUFpQkosSUFBakIsRUFBdUIsRUFBQ2lCLFdBQVcsT0FBWixFQUF2QixDQUFaO0FBQ0EsVUFBT0YsS0FBUDtBQUNBOzs7Ozs7QUFHRkcsT0FBT0MsT0FBUCxHQUFpQnBCLFlBQWpCIiwiZmlsZSI6Ikp3dEdlbmVyYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuXG5jbGFzcyBKd3RHZW5lcmF0b3Ige1xuXHQvKipcblx0ICogR2VuZXJhdGUgYSBKU09OIFdlYiBUb2tlbiAoSldUKS5cblx0ICpcblx0ICogQHBhcmFtIHtCdWZmZXJ9IGNlcnQgLSB0aGUgcHJpdmF0ZSBrZXkgY2VydGlmaWNhdGUgdG8gYmUgdXNlZCB3aGVuIHNpZ25pbmdcblx0ICpcdFx0dGhlIGNsYWltcy5cblx0ICogQHBhcmFtIHtPYmplY3R9IGNsYWltcyAtIGFkZGl0aW9uYWwgY2xhaW1zIHRvIGluY2x1ZGUgd2l0aGluIHRoZSBnZW5lcmF0ZWRcblx0ICogXHRcdEpXVC5cblx0ICpcblx0ICogQHJldHVybnMge1N0cmluZ30gdGhlIGdlbmVyYXRlZCB0b2tlblxuXHQgKi9cblx0Z2VuZXJhdGUoY2VydCwgY2xhaW1zID0ge30pIHtcblx0XHRpZighY2VydCBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdjZXJ0IG11c3QgYmUgb2YgdHlwZSBCdWZmZXInKTtcblx0XHR9XG5cdFx0aWYodHlwZW9mIGNsYWltcyAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignY2xhaW1zIG11c3QgYmUgb2YgdHlwZSBvYmplY3QnKTtcblx0XHR9XG5cdFx0XG5cdFx0dmFyIHRvU2lnbiA9IHtcblx0XHRcdCdpYXQnOiBjbGFpbXMuaXNzdWVkQXQgfHwgcGFyc2VJbnQoRGF0ZS5ub3coKS8xMDAwLCAxMCksXG5cdFx0XHQnanRpJzogY2xhaW1zLmp0aSB8fCB1dWlkLnYxKClcblx0XHR9O1xuXHRcdE9iamVjdC5rZXlzKGNsYWltcykuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHR0b1NpZ25ba2V5XSA9IGNsYWltc1trZXldO1xuXHRcdH0pO1xuXHRcdFxuXHRcdHZhciB0b2tlbiA9IGp3dC5zaWduKHRvU2lnbiwgY2VydCwge2FsZ29yaXRobTogJ1JTMjU2J30pO1xuXHRcdHJldHVybiB0b2tlbjtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEp3dEdlbmVyYXRvcjtcbiJdfQ==