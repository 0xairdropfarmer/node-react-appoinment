"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Account = function () {

  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition Account options.
   */
  function Account(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Account);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * TODO: document
   */


  _createClass(Account, [{
    key: "checkBalance",
    value: function checkBalance() {
      this._nexmo.checkBalance.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "updatePassword",
    value: function updatePassword() {
      this._nexmo.changePassword.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "updateSMSCallback",
    value: function updateSMSCallback() {
      this._nexmo.changeMoCallbackUrl.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "updateDeliveryReceiptCallback",
    value: function updateDeliveryReceiptCallback() {
      this._nexmo.changeDrCallbackUrl.apply(this._nexmo, arguments);
    }
  }]);

  return Account;
}();

exports.default = Account;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BY2NvdW50LmpzIl0sIm5hbWVzIjpbIkFjY291bnQiLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJjcmVkcyIsIl9uZXhtbyIsIm5leG1vT3ZlcnJpZGUiLCJpbml0aWFsaXplIiwiYXBpS2V5IiwiYXBpU2VjcmV0IiwiY2hlY2tCYWxhbmNlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJjaGFuZ2VQYXNzd29yZCIsImNoYW5nZU1vQ2FsbGJhY2tVcmwiLCJjaGFuZ2VEckNhbGxiYWNrVXJsIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFTUEsTzs7QUFFSjs7Ozs7O0FBTUEsbUJBQVlDLFdBQVosRUFBdUM7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3JDLFNBQUtDLEtBQUwsR0FBYUYsV0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQTtBQUNBLFNBQUtFLE1BQUwsR0FBYyxLQUFLRixPQUFMLENBQWFHLGFBQWIsbUJBQWQ7O0FBRUEsU0FBS0QsTUFBTCxDQUFZRSxVQUFaLENBQXVCLEtBQUtILEtBQUwsQ0FBV0ksTUFBbEMsRUFBMEMsS0FBS0osS0FBTCxDQUFXSyxTQUFyRCxFQUFnRSxLQUFLTixPQUFyRTtBQUNEOztBQUVEOzs7Ozs7O21DQUdlO0FBQ2IsV0FBS0UsTUFBTCxDQUFZSyxZQUFaLENBQXlCQyxLQUF6QixDQUErQixLQUFLTixNQUFwQyxFQUE0Q08sU0FBNUM7QUFDRDs7QUFFRDs7Ozs7O3FDQUdpQjtBQUNmLFdBQUtQLE1BQUwsQ0FBWVEsY0FBWixDQUEyQkYsS0FBM0IsQ0FBaUMsS0FBS04sTUFBdEMsRUFBOENPLFNBQTlDO0FBQ0Q7O0FBRUQ7Ozs7Ozt3Q0FHb0I7QUFDbEIsV0FBS1AsTUFBTCxDQUFZUyxtQkFBWixDQUFnQ0gsS0FBaEMsQ0FBc0MsS0FBS04sTUFBM0MsRUFBbURPLFNBQW5EO0FBQ0Q7O0FBRUQ7Ozs7OztvREFHZ0M7QUFDOUIsV0FBS1AsTUFBTCxDQUFZVSxtQkFBWixDQUFnQ0osS0FBaEMsQ0FBc0MsS0FBS04sTUFBM0MsRUFBbURPLFNBQW5EO0FBQ0Q7Ozs7OztrQkFJWVgsTyIsImZpbGUiOiJBY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBuZXhtbyBmcm9tICcuL2luZGV4JztcblxuY2xhc3MgQWNjb3VudCB7XG4gIFxuICAvKipcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogICAgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogICAgQWRkaXRpb24gQWNjb3VudCBvcHRpb25zLlxuICAgKi9cbiAgY29uc3RydWN0b3IoY3JlZGVudGlhbHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuY3JlZHMgPSBjcmVkZW50aWFscztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIFxuICAgIC8vIFVzZWQgdG8gZmFjaWxpdGF0ZSB0ZXN0aW5nIG9mIHRoZSBjYWxsIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdFxuICAgIHRoaXMuX25leG1vID0gdGhpcy5vcHRpb25zLm5leG1vT3ZlcnJpZGUgfHwgbmV4bW87XG4gICAgXG4gICAgdGhpcy5fbmV4bW8uaW5pdGlhbGl6ZSh0aGlzLmNyZWRzLmFwaUtleSwgdGhpcy5jcmVkcy5hcGlTZWNyZXQsIHRoaXMub3B0aW9ucyk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgY2hlY2tCYWxhbmNlKCkge1xuICAgIHRoaXMuX25leG1vLmNoZWNrQmFsYW5jZS5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICB1cGRhdGVQYXNzd29yZCgpIHtcbiAgICB0aGlzLl9uZXhtby5jaGFuZ2VQYXNzd29yZC5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICB1cGRhdGVTTVNDYWxsYmFjaygpIHtcbiAgICB0aGlzLl9uZXhtby5jaGFuZ2VNb0NhbGxiYWNrVXJsLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG4gIFxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIHVwZGF0ZURlbGl2ZXJ5UmVjZWlwdENhbGxiYWNrKCkge1xuICAgIHRoaXMuX25leG1vLmNoYW5nZURyQ2FsbGJhY2tVcmwuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gIH1cbiAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY291bnQ7XG4iXX0=