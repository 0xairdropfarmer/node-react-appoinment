"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _JwtGenerator = require('./JwtGenerator');

var _JwtGenerator2 = _interopRequireDefault(_JwtGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Right now only key/secret credentials are supported.
 * However, in time JWT will also be supported.
 * The `Credentials` object provides an abstraction to this.
 *
 * @param {string} apiKey - A Nexmo API Key
 * @param {string} apiSecret - A Nexmo API Secret
 * @param {string|Buffer} [privateKey] -  When a string value is passed it should
 *                        either represent the path to the private key, or the actual
 *                        private key in string format. If a Buffer is passed then
 *                        it should be the key read from the file system.
 */
var Credentials = function () {
  function Credentials(apiKey, apiSecret, privateKey, applicationId) {
    _classCallCheck(this, Credentials);

    this.apiKey = apiKey;
    this.apiSecret = apiSecret;

    this.privateKey = null;
    this.applicationId = applicationId;

    if (privateKey instanceof Buffer) {
      this.privateKey = privateKey;
    } else if (typeof privateKey === "string" && privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
      this.privateKey = new Buffer(privateKey);
    } else if (privateKey !== undefined) {
      if (!_fs2.default.existsSync(privateKey)) {
        throw new Error('File "' + privateKey + '" not found.');
      }
      this.privateKey = _fs2.default.readFileSync(privateKey);
    }

    /** @private */
    this._jwtGenerator = new _JwtGenerator2.default();
  }

  /**
   * Generate a Jwt using the Private Key in the Credentials.
   * By default the credentials.applicationId will be used when creating the token.
   * However, this can be overwritten.
   *
   * @param {string} [applicationId] an application ID to be used instead of the
   *                default Credentials.applicationId value.
   *
   * @returns {string} The generated JWT
   */


  _createClass(Credentials, [{
    key: 'generateJwt',
    value: function generateJwt() {
      var applicationId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.applicationId;
      var privateKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.privateKey;

      var claims = { application_id: applicationId };
      var token = this._jwtGenerator.generate(privateKey, claims);
      return token;
    }

    /**
     * @private
     * Used for testing purposes only.
     */

  }, {
    key: '_setJwtGenerator',
    value: function _setJwtGenerator(generator) {
      this._jwtGenerator = generator;
    }

    /**
     * Ensures a credentials instance is used.
     *
     * Key/Secret credentials are only supported at present.
     */

  }], [{
    key: 'parse',
    value: function parse(obj) {
      if (obj instanceof Credentials) {
        return obj;
      } else {
        return new Credentials(obj.apiKey, obj.apiSecret, obj.privateKey, obj.applicationId);
      }
    }
  }]);

  return Credentials;
}();

exports.default = Credentials;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DcmVkZW50aWFscy5qcyJdLCJuYW1lcyI6WyJDcmVkZW50aWFscyIsImFwaUtleSIsImFwaVNlY3JldCIsInByaXZhdGVLZXkiLCJhcHBsaWNhdGlvbklkIiwiQnVmZmVyIiwic3RhcnRzV2l0aCIsInVuZGVmaW5lZCIsImV4aXN0c1N5bmMiLCJFcnJvciIsInJlYWRGaWxlU3luYyIsIl9qd3RHZW5lcmF0b3IiLCJjbGFpbXMiLCJhcHBsaWNhdGlvbl9pZCIsInRva2VuIiwiZ2VuZXJhdGUiLCJnZW5lcmF0b3IiLCJvYmoiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztJQVlNQSxXO0FBQ0osdUJBQVlDLE1BQVosRUFBb0JDLFNBQXBCLEVBQStCQyxVQUEvQixFQUEyQ0MsYUFBM0MsRUFBMEQ7QUFBQTs7QUFDeEQsU0FBS0gsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkEsU0FBakI7O0FBRUEsU0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFFBQUdELHNCQUFzQkUsTUFBekIsRUFBaUM7QUFDL0IsV0FBS0YsVUFBTCxHQUFrQkEsVUFBbEI7QUFDRCxLQUZELE1BR0ssSUFBRyxPQUFPQSxVQUFQLEtBQXNCLFFBQXRCLElBQ0xBLFdBQVdHLFVBQVgsQ0FBc0IsNkJBQXRCLENBREUsRUFDb0Q7QUFDdkQsV0FBS0gsVUFBTCxHQUFrQixJQUFJRSxNQUFKLENBQVdGLFVBQVgsQ0FBbEI7QUFDRCxLQUhJLE1BSUEsSUFBR0EsZUFBZUksU0FBbEIsRUFBNkI7QUFDaEMsVUFBRyxDQUFDLGFBQUdDLFVBQUgsQ0FBY0wsVUFBZCxDQUFKLEVBQStCO0FBQzdCLGNBQU0sSUFBSU0sS0FBSixZQUFtQk4sVUFBbkIsa0JBQU47QUFDRDtBQUNELFdBQUtBLFVBQUwsR0FBa0IsYUFBR08sWUFBSCxDQUFnQlAsVUFBaEIsQ0FBbEI7QUFDRDs7QUFFRDtBQUNBLFNBQUtRLGFBQUwsR0FBcUIsNEJBQXJCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7O2tDQVU4RTtBQUFBLFVBQWxFUCxhQUFrRSx1RUFBbEQsS0FBS0EsYUFBNkM7QUFBQSxVQUE5QkQsVUFBOEIsdUVBQWpCLEtBQUtBLFVBQVk7O0FBQzVFLFVBQUlTLFNBQVMsRUFBQ0MsZ0JBQWdCVCxhQUFqQixFQUFiO0FBQ0EsVUFBSVUsUUFBUSxLQUFLSCxhQUFMLENBQW1CSSxRQUFuQixDQUE0QlosVUFBNUIsRUFBd0NTLE1BQXhDLENBQVo7QUFDQSxhQUFPRSxLQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7cUNBSWlCRSxTLEVBQVc7QUFDMUIsV0FBS0wsYUFBTCxHQUFxQkssU0FBckI7QUFDRDs7QUFFRDs7Ozs7Ozs7MEJBS2FDLEcsRUFBSztBQUNoQixVQUFHQSxlQUFlakIsV0FBbEIsRUFBK0I7QUFDN0IsZUFBT2lCLEdBQVA7QUFDRCxPQUZELE1BR0s7QUFDSCxlQUFPLElBQUlqQixXQUFKLENBQWdCaUIsSUFBSWhCLE1BQXBCLEVBQTRCZ0IsSUFBSWYsU0FBaEMsRUFBMkNlLElBQUlkLFVBQS9DLEVBQTJEYyxJQUFJYixhQUEvRCxDQUFQO0FBQ0Q7QUFDRjs7Ozs7O2tCQUdZSixXIiwiZmlsZSI6IkNyZWRlbnRpYWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgSnd0R2VuZXJhdG9yIGZyb20gJy4vSnd0R2VuZXJhdG9yJztcblxuLyoqXG4gKiBSaWdodCBub3cgb25seSBrZXkvc2VjcmV0IGNyZWRlbnRpYWxzIGFyZSBzdXBwb3J0ZWQuXG4gKiBIb3dldmVyLCBpbiB0aW1lIEpXVCB3aWxsIGFsc28gYmUgc3VwcG9ydGVkLlxuICogVGhlIGBDcmVkZW50aWFsc2Agb2JqZWN0IHByb3ZpZGVzIGFuIGFic3RyYWN0aW9uIHRvIHRoaXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGFwaUtleSAtIEEgTmV4bW8gQVBJIEtleVxuICogQHBhcmFtIHtzdHJpbmd9IGFwaVNlY3JldCAtIEEgTmV4bW8gQVBJIFNlY3JldFxuICogQHBhcmFtIHtzdHJpbmd8QnVmZmVyfSBbcHJpdmF0ZUtleV0gLSAgV2hlbiBhIHN0cmluZyB2YWx1ZSBpcyBwYXNzZWQgaXQgc2hvdWxkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIGVpdGhlciByZXByZXNlbnQgdGhlIHBhdGggdG8gdGhlIHByaXZhdGUga2V5LCBvciB0aGUgYWN0dWFsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUga2V5IGluIHN0cmluZyBmb3JtYXQuIElmIGEgQnVmZmVyIGlzIHBhc3NlZCB0aGVuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIGl0IHNob3VsZCBiZSB0aGUga2V5IHJlYWQgZnJvbSB0aGUgZmlsZSBzeXN0ZW0uXG4gKi9cbmNsYXNzIENyZWRlbnRpYWxzIHtcbiAgY29uc3RydWN0b3IoYXBpS2V5LCBhcGlTZWNyZXQsIHByaXZhdGVLZXksIGFwcGxpY2F0aW9uSWQpIHtcbiAgICB0aGlzLmFwaUtleSA9IGFwaUtleTtcbiAgICB0aGlzLmFwaVNlY3JldCA9IGFwaVNlY3JldDtcblxuICAgIHRoaXMucHJpdmF0ZUtleSA9IG51bGw7XG4gICAgdGhpcy5hcHBsaWNhdGlvbklkID0gYXBwbGljYXRpb25JZDtcblxuICAgIGlmKHByaXZhdGVLZXkgaW5zdGFuY2VvZiBCdWZmZXIpIHtcbiAgICAgIHRoaXMucHJpdmF0ZUtleSA9IHByaXZhdGVLZXk7XG4gICAgfVxuICAgIGVsc2UgaWYodHlwZW9mIHByaXZhdGVLZXkgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICBwcml2YXRlS2V5LnN0YXJ0c1dpdGgoJy0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLScpKSB7XG4gICAgICB0aGlzLnByaXZhdGVLZXkgPSBuZXcgQnVmZmVyKHByaXZhdGVLZXkpO1xuICAgIH1cbiAgICBlbHNlIGlmKHByaXZhdGVLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYoIWZzLmV4aXN0c1N5bmMocHJpdmF0ZUtleSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIFwiJHtwcml2YXRlS2V5fVwiIG5vdCBmb3VuZC5gKVxuICAgICAgfVxuICAgICAgdGhpcy5wcml2YXRlS2V5ID0gZnMucmVhZEZpbGVTeW5jKHByaXZhdGVLZXkpO1xuICAgIH1cblxuICAgIC8qKiBAcHJpdmF0ZSAqL1xuICAgIHRoaXMuX2p3dEdlbmVyYXRvciA9IG5ldyBKd3RHZW5lcmF0b3IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIEp3dCB1c2luZyB0aGUgUHJpdmF0ZSBLZXkgaW4gdGhlIENyZWRlbnRpYWxzLlxuICAgKiBCeSBkZWZhdWx0IHRoZSBjcmVkZW50aWFscy5hcHBsaWNhdGlvbklkIHdpbGwgYmUgdXNlZCB3aGVuIGNyZWF0aW5nIHRoZSB0b2tlbi5cbiAgICogSG93ZXZlciwgdGhpcyBjYW4gYmUgb3ZlcndyaXR0ZW4uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbYXBwbGljYXRpb25JZF0gYW4gYXBwbGljYXRpb24gSUQgdG8gYmUgdXNlZCBpbnN0ZWFkIG9mIHRoZVxuICAgKiAgICAgICAgICAgICAgICBkZWZhdWx0IENyZWRlbnRpYWxzLmFwcGxpY2F0aW9uSWQgdmFsdWUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBnZW5lcmF0ZWQgSldUXG4gICAqL1xuICBnZW5lcmF0ZUp3dChhcHBsaWNhdGlvbklkID0gdGhpcy5hcHBsaWNhdGlvbklkLCBwcml2YXRlS2V5ID0gdGhpcy5wcml2YXRlS2V5KSB7XG4gICAgdmFyIGNsYWltcyA9IHthcHBsaWNhdGlvbl9pZDogYXBwbGljYXRpb25JZH07XG4gICAgdmFyIHRva2VuID0gdGhpcy5fand0R2VuZXJhdG9yLmdlbmVyYXRlKHByaXZhdGVLZXksIGNsYWltcyk7XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIFVzZWQgZm9yIHRlc3RpbmcgcHVycG9zZXMgb25seS5cbiAgICovXG4gIF9zZXRKd3RHZW5lcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgdGhpcy5fand0R2VuZXJhdG9yID0gZ2VuZXJhdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgYSBjcmVkZW50aWFscyBpbnN0YW5jZSBpcyB1c2VkLlxuICAgKlxuICAgKiBLZXkvU2VjcmV0IGNyZWRlbnRpYWxzIGFyZSBvbmx5IHN1cHBvcnRlZCBhdCBwcmVzZW50LlxuICAgKi9cbiAgc3RhdGljIHBhcnNlKG9iaikge1xuICAgIGlmKG9iaiBpbnN0YW5jZW9mIENyZWRlbnRpYWxzKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgQ3JlZGVudGlhbHMob2JqLmFwaUtleSwgb2JqLmFwaVNlY3JldCwgb2JqLnByaXZhdGVLZXksIG9iai5hcHBsaWNhdGlvbklkKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ3JlZGVudGlhbHM7XG4iXX0=