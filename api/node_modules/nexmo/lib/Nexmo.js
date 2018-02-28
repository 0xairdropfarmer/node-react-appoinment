'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _Credentials = require('./Credentials');

var _Credentials2 = _interopRequireDefault(_Credentials);

var _JwtGenerator = require('./JwtGenerator');

var _JwtGenerator2 = _interopRequireDefault(_JwtGenerator);

var _Message = require('./Message');

var _Message2 = _interopRequireDefault(_Message);

var _Voice = require('./Voice');

var _Voice2 = _interopRequireDefault(_Voice);

var _Number = require('./Number');

var _Number2 = _interopRequireDefault(_Number);

var _Verify = require('./Verify');

var _Verify2 = _interopRequireDefault(_Verify);

var _NumberInsight = require('./NumberInsight');

var _NumberInsight2 = _interopRequireDefault(_NumberInsight);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _Account = require('./Account');

var _Account2 = _interopRequireDefault(_Account);

var _CallsResource = require('./CallsResource');

var _CallsResource2 = _interopRequireDefault(_CallsResource);

var _FilesResource = require('./FilesResource');

var _FilesResource2 = _interopRequireDefault(_FilesResource);

var _HttpClient = require('./HttpClient');

var _HttpClient2 = _interopRequireDefault(_HttpClient);

var _NullLogger = require('./NullLogger');

var _NullLogger2 = _interopRequireDefault(_NullLogger);

var _ConsoleLogger = require('./ConsoleLogger');

var _ConsoleLogger2 = _interopRequireDefault(_ConsoleLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jwtGeneratorInstance = new _JwtGenerator2.default();

var Nexmo = function () {

  /**
   * @param {Credentials} credentials - Nexmo API credentials
   * @param {string} credentials.apiKey - the Nexmo API key
   * @param {string} credentials.apiSecret - the Nexmo API secret
   * @param {Object} options - Additional options
   * @param {boolean} options.debug - `true` to turn on debug logging
   * @param {Object} options.logger - Set a custom logger.
   * @param {string} options.appendToUserAgent - A value to append to the user agent.
   *                    The value will be prefixed with a `/`
   */
  function Nexmo(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { debug: false };

    _classCallCheck(this, Nexmo);

    this.credentials = _Credentials2.default.parse(credentials);
    this.options = options;

    // If no logger has been supplied but debug has been set
    // default to using the ConsoleLogger
    if (!this.options.logger && this.options.debug) {
      this.options.logger = new _ConsoleLogger2.default();
    } else if (!this.options.logger) {
      // Swallow the logging
      this.options.logger = new _NullLogger2.default();
    }

    var userAgent = 'nexmo-node/UNKNOWN node/UNKNOWN';
    try {
      var packageDetails = require(__dirname + '/../package.json');
      userAgent = 'nexmo-node/' + packageDetails.version + ' node/' + process.version.replace('v', '');
    } catch (e) {
      console.warn('Could not load package details');
    }
    this.options.userAgent = userAgent;
    if (this.options.appendToUserAgent) {
      this.options.userAgent += ' ' + this.options.appendToUserAgent;
    }
    this.options.httpClient = new _HttpClient2.default(this.options);

    this.message = new _Message2.default(this.credentials, this.options);
    this.voice = new _Voice2.default(this.credentials, this.options);
    this.number = new _Number2.default(this.credentials, this.options);
    this.verify = new _Verify2.default(this.credentials, this.options);
    this.numberInsight = new _NumberInsight2.default(this.credentials, this.options);
    this.applications = new _App2.default(this.credentials, this.options);
    this.account = new _Account2.default(this.credentials, this.options);
    this.calls = new _CallsResource2.default(this.credentials, this.options);
    this.files = new _FilesResource2.default(this.credentials, this.options);

    /**
     * @deprecated Please use nexmo.applications
     */
    this.app = this.applications;
  }

  /**
   * Generate a JSON Web Token (JWT).
   *
   * The private key used upon Nexmo instance construction will be used to sign
   * the JWT. The application_id you used upon Nexmo instance creation will be
   * included in the claims for the JWT, however this can be overridden by passing
   * an application_id as part of the claims.
   *
   * @param {Object} claims - name/value pair claims to sign within the JWT
   *
   * @returns {String} the generated token
   */


  _createClass(Nexmo, [{
    key: 'generateJwt',
    value: function generateJwt() {
      var claims = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (claims.application_id === undefined) {
        claims.application_id = this.credentials.applicationId;
      }
      return Nexmo.generateJwt(this.credentials.privateKey, claims);
    }
  }]);

  return Nexmo;
}();

/**
 * Generate a JSON Web Token (JWT).
 *
 * @param {String|Buffer} privateKey - the path to the private key certificate
 *          to be used when signing the claims.
 * @param {Object} claims - name/value pair claims to sign within the JWT
 *
 * @returns {String} the generated token
 */


Nexmo.generateJwt = function (privateKey, claims) {
  if (!(privateKey instanceof Buffer)) {
    if (!_fs2.default.existsSync(privateKey)) {
      throw new Error('File "' + privateKey + '" not found.');
    } else {
      privateKey = _fs2.default.readFileSync(privateKey);
    }
  }
  return jwtGeneratorInstance.generate(privateKey, claims);
};

exports.default = Nexmo;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9OZXhtby5qcyJdLCJuYW1lcyI6WyJqd3RHZW5lcmF0b3JJbnN0YW5jZSIsIk5leG1vIiwiY3JlZGVudGlhbHMiLCJvcHRpb25zIiwiZGVidWciLCJwYXJzZSIsImxvZ2dlciIsInVzZXJBZ2VudCIsInBhY2thZ2VEZXRhaWxzIiwicmVxdWlyZSIsIl9fZGlybmFtZSIsInZlcnNpb24iLCJwcm9jZXNzIiwicmVwbGFjZSIsImUiLCJjb25zb2xlIiwid2FybiIsImFwcGVuZFRvVXNlckFnZW50IiwiaHR0cENsaWVudCIsIm1lc3NhZ2UiLCJ2b2ljZSIsIm51bWJlciIsInZlcmlmeSIsIm51bWJlckluc2lnaHQiLCJhcHBsaWNhdGlvbnMiLCJhY2NvdW50IiwiY2FsbHMiLCJmaWxlcyIsImFwcCIsImNsYWltcyIsImFwcGxpY2F0aW9uX2lkIiwidW5kZWZpbmVkIiwiYXBwbGljYXRpb25JZCIsImdlbmVyYXRlSnd0IiwicHJpdmF0ZUtleSIsIkJ1ZmZlciIsImV4aXN0c1N5bmMiLCJFcnJvciIsInJlYWRGaWxlU3luYyIsImdlbmVyYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSx1QkFBdUIsNEJBQTdCOztJQUVNQyxLOztBQUVKOzs7Ozs7Ozs7O0FBVUEsaUJBQVlDLFdBQVosRUFBa0Q7QUFBQSxRQUF6QkMsT0FBeUIsdUVBQWYsRUFBQ0MsT0FBTSxLQUFQLEVBQWU7O0FBQUE7O0FBQ2hELFNBQUtGLFdBQUwsR0FBbUIsc0JBQVlHLEtBQVosQ0FBa0JILFdBQWxCLENBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmOztBQUVBO0FBQ0E7QUFDQSxRQUFHLENBQUMsS0FBS0EsT0FBTCxDQUFhRyxNQUFk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QUFDRCxDQVZEOztrQkFZZTVCLEsiLCJmaWxlIjoiTmV4bW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG5pbXBvcnQgQ3JlZGVudGlhbHMgZnJvbSAnLi9DcmVkZW50aWFscyc7XG5pbXBvcnQgSnd0R2VuZXJhdG9yIGZyb20gJy4vSnd0R2VuZXJhdG9yJztcbmltcG9ydCBNZXNzYWdlIGZyb20gJy4vTWVzc2FnZSc7XG5pbXBvcnQgVm9pY2UgZnJvbSAnLi9Wb2ljZSc7XG5pbXBvcnQgTnVtYmVyIGZyb20gJy4vTnVtYmVyJztcbmltcG9ydCBWZXJpZnkgZnJvbSAnLi9WZXJpZnknO1xuaW1wb3J0IE51bWJlckluc2lnaHQgZnJvbSAnLi9OdW1iZXJJbnNpZ2h0JztcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9BY2NvdW50JztcbmltcG9ydCBDYWxsc1Jlc291cmNlIGZyb20gJy4vQ2FsbHNSZXNvdXJjZSc7XG5pbXBvcnQgRmlsZXNSZXNvdXJjZSBmcm9tICcuL0ZpbGVzUmVzb3VyY2UnO1xuaW1wb3J0IEh0dHBDbGllbnQgZnJvbSAnLi9IdHRwQ2xpZW50JztcbmltcG9ydCBOdWxsTG9nZ2VyIGZyb20gJy4vTnVsbExvZ2dlcic7XG5pbXBvcnQgQ29uc29sZUxvZ2dlciBmcm9tICcuL0NvbnNvbGVMb2dnZXInO1xuXG5jb25zdCBqd3RHZW5lcmF0b3JJbnN0YW5jZSA9IG5ldyBKd3RHZW5lcmF0b3IoKTtcblxuY2xhc3MgTmV4bW8ge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFscyAtIE5leG1vIEFQSSBjcmVkZW50aWFsc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gY3JlZGVudGlhbHMuYXBpS2V5IC0gdGhlIE5leG1vIEFQSSBrZXlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNyZWRlbnRpYWxzLmFwaVNlY3JldCAtIHRoZSBOZXhtbyBBUEkgc2VjcmV0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gQWRkaXRpb25hbCBvcHRpb25zXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5kZWJ1ZyAtIGB0cnVlYCB0byB0dXJuIG9uIGRlYnVnIGxvZ2dpbmdcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMubG9nZ2VyIC0gU2V0IGEgY3VzdG9tIGxvZ2dlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYXBwZW5kVG9Vc2VyQWdlbnQgLSBBIHZhbHVlIHRvIGFwcGVuZCB0byB0aGUgdXNlciBhZ2VudC5cbiAgICogICAgICAgICAgICAgICAgICAgIFRoZSB2YWx1ZSB3aWxsIGJlIHByZWZpeGVkIHdpdGggYSBgL2BcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNyZWRlbnRpYWxzLCBvcHRpb25zID0ge2RlYnVnOmZhbHNlfSkge1xuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBDcmVkZW50aWFscy5wYXJzZShjcmVkZW50aWFscyk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIC8vIElmIG5vIGxvZ2dlciBoYXMgYmVlbiBzdXBwbGllZCBidXQgZGVidWcgaGFzIGJlZW4gc2V0XG4gICAgLy8gZGVmYXVsdCB0byB1c2luZyB0aGUgQ29uc29sZUxvZ2dlclxuICAgIGlmKCF0aGlzLm9wdGlvbnMubG9nZ2VyICYmIHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgdGhpcy5vcHRpb25zLmxvZ2dlciA9IG5ldyBDb25zb2xlTG9nZ2VyKCk7XG4gICAgfVxuICAgIGVsc2UgaWYoIXRoaXMub3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgIC8vIFN3YWxsb3cgdGhlIGxvZ2dpbmdcbiAgICAgIHRoaXMub3B0aW9ucy5sb2dnZXIgPSBuZXcgTnVsbExvZ2dlcigpO1xuICAgIH1cblxuICAgIGxldCB1c2VyQWdlbnQgPSAnbmV4bW8tbm9kZS9VTktOT1dOIG5vZGUvVU5LTk9XTic7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBwYWNrYWdlRGV0YWlscyA9IHJlcXVpcmUoX19kaXJuYW1lICsgJy8uLi9wYWNrYWdlLmpzb24nKTtcbiAgICAgIHVzZXJBZ2VudCA9IGBuZXhtby1ub2RlLyR7cGFja2FnZURldGFpbHMudmVyc2lvbn0gbm9kZS8ke3Byb2Nlc3MudmVyc2lvbi5yZXBsYWNlKCd2JywgJycpfWA7XG4gICAgfVxuICAgIGNhdGNoKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignQ291bGQgbm90IGxvYWQgcGFja2FnZSBkZXRhaWxzJyk7XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucy51c2VyQWdlbnQgPSB1c2VyQWdlbnQ7XG4gICAgaWYodGhpcy5vcHRpb25zLmFwcGVuZFRvVXNlckFnZW50KSB7XG4gICAgICB0aGlzLm9wdGlvbnMudXNlckFnZW50ICs9IGAgJHt0aGlzLm9wdGlvbnMuYXBwZW5kVG9Vc2VyQWdlbnR9YDtcbiAgICB9XG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQgPSBuZXcgSHR0cENsaWVudCh0aGlzLm9wdGlvbnMpXG5cbiAgICB0aGlzLm1lc3NhZ2UgPSBuZXcgTWVzc2FnZSh0aGlzLmNyZWRlbnRpYWxzLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMudm9pY2UgPSBuZXcgVm9pY2UodGhpcy5jcmVkZW50aWFscywgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLm51bWJlciA9IG5ldyBOdW1iZXIodGhpcy5jcmVkZW50aWFscywgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLnZlcmlmeSA9IG5ldyBWZXJpZnkodGhpcy5jcmVkZW50aWFscywgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLm51bWJlckluc2lnaHQgPSBuZXcgTnVtYmVySW5zaWdodCh0aGlzLmNyZWRlbnRpYWxzLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuYXBwbGljYXRpb25zID0gbmV3IEFwcCh0aGlzLmNyZWRlbnRpYWxzLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuYWNjb3VudCA9IG5ldyBBY2NvdW50KHRoaXMuY3JlZGVudGlhbHMsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5jYWxscyA9IG5ldyBDYWxsc1Jlc291cmNlKHRoaXMuY3JlZGVudGlhbHMsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5maWxlcyA9IG5ldyBGaWxlc1Jlc291cmNlKHRoaXMuY3JlZGVudGlhbHMsIHRoaXMub3B0aW9ucyk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBQbGVhc2UgdXNlIG5leG1vLmFwcGxpY2F0aW9uc1xuICAgICAqL1xuICAgIHRoaXMuYXBwID0gdGhpcy5hcHBsaWNhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSBKU09OIFdlYiBUb2tlbiAoSldUKS5cbiAgICpcbiAgICogVGhlIHByaXZhdGUga2V5IHVzZWQgdXBvbiBOZXhtbyBpbnN0YW5jZSBjb25zdHJ1Y3Rpb24gd2lsbCBiZSB1c2VkIHRvIHNpZ25cbiAgICogdGhlIEpXVC4gVGhlIGFwcGxpY2F0aW9uX2lkIHlvdSB1c2VkIHVwb24gTmV4bW8gaW5zdGFuY2UgY3JlYXRpb24gd2lsbCBiZVxuICAgKiBpbmNsdWRlZCBpbiB0aGUgY2xhaW1zIGZvciB0aGUgSldULCBob3dldmVyIHRoaXMgY2FuIGJlIG92ZXJyaWRkZW4gYnkgcGFzc2luZ1xuICAgKiBhbiBhcHBsaWNhdGlvbl9pZCBhcyBwYXJ0IG9mIHRoZSBjbGFpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjbGFpbXMgLSBuYW1lL3ZhbHVlIHBhaXIgY2xhaW1zIHRvIHNpZ24gd2l0aGluIHRoZSBKV1RcbiAgICpcbiAgICogQHJldHVybnMge1N0cmluZ30gdGhlIGdlbmVyYXRlZCB0b2tlblxuICAgKi9cbiAgZ2VuZXJhdGVKd3QoY2xhaW1zID0ge30pIHtcbiAgICBpZihjbGFpbXMuYXBwbGljYXRpb25faWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xhaW1zLmFwcGxpY2F0aW9uX2lkID0gdGhpcy5jcmVkZW50aWFscy5hcHBsaWNhdGlvbklkO1xuICAgIH1cbiAgICByZXR1cm4gTmV4bW8uZ2VuZXJhdGVKd3QodGhpcy5jcmVkZW50aWFscy5wcml2YXRlS2V5LCBjbGFpbXMpO1xuICB9XG59XG5cbi8qKlxuICogR2VuZXJhdGUgYSBKU09OIFdlYiBUb2tlbiAoSldUKS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xCdWZmZXJ9IHByaXZhdGVLZXkgLSB0aGUgcGF0aCB0byB0aGUgcHJpdmF0ZSBrZXkgY2VydGlmaWNhdGVcbiAqICAgICAgICAgIHRvIGJlIHVzZWQgd2hlbiBzaWduaW5nIHRoZSBjbGFpbXMuXG4gKiBAcGFyYW0ge09iamVjdH0gY2xhaW1zIC0gbmFtZS92YWx1ZSBwYWlyIGNsYWltcyB0byBzaWduIHdpdGhpbiB0aGUgSldUXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gdGhlIGdlbmVyYXRlZCB0b2tlblxuICovXG5OZXhtby5nZW5lcmF0ZUp3dCA9IChwcml2YXRlS2V5LCBjbGFpbXMpID0+IHtcbiAgaWYoIShwcml2YXRlS2V5IGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgICAgaWYoIWZzLmV4aXN0c1N5bmMocHJpdmF0ZUtleSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgXCIke3ByaXZhdGVLZXl9XCIgbm90IGZvdW5kLmApO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICAgcHJpdmF0ZUtleSA9IGZzLnJlYWRGaWxlU3luYyhwcml2YXRlS2V5KTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gand0R2VuZXJhdG9ySW5zdGFuY2UuZ2VuZXJhdGUocHJpdmF0ZUtleSwgY2xhaW1zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV4bW87XG4iXX0=