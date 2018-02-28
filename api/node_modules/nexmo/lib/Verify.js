"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Verify = function () {

  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition Verify options.
   */
  function Verify(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Verify);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * TODO: document
   */


  _createClass(Verify, [{
    key: "request",
    value: function request() {
      this._nexmo.verifyNumber.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "check",
    value: function check() {
      this._nexmo.checkVerifyRequest.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "control",
    value: function control() {
      this._nexmo.controlVerifyRequest.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "search",
    value: function search() {
      this._nexmo.searchVerifyRequest.apply(this._nexmo, arguments);
    }
  }]);

  return Verify;
}();

exports.default = Verify;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WZXJpZnkuanMiXSwibmFtZXMiOlsiVmVyaWZ5IiwiY3JlZGVudGlhbHMiLCJvcHRpb25zIiwiY3JlZHMiLCJfbmV4bW8iLCJuZXhtb092ZXJyaWRlIiwiaW5pdGlhbGl6ZSIsImFwaUtleSIsImFwaVNlY3JldCIsInZlcmlmeU51bWJlciIsImFwcGx5IiwiYXJndW1lbnRzIiwiY2hlY2tWZXJpZnlSZXF1ZXN0IiwiY29udHJvbFZlcmlmeVJlcXVlc3QiLCJzZWFyY2hWZXJpZnlSZXF1ZXN0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFTUEsTTs7QUFFSjs7Ozs7O0FBTUEsa0JBQVlDLFdBQVosRUFBdUM7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3JDLFNBQUtDLEtBQUwsR0FBYUYsV0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQTtBQUNBLFNBQUtFLE1BQUwsR0FBYyxLQUFLRixPQUFMLENBQWFHLGFBQWIsbUJBQWQ7O0FBRUEsU0FBS0QsTUFBTCxDQUFZRSxVQUFaLENBQXVCLEtBQUtILEtBQUwsQ0FBV0ksTUFBbEMsRUFBMEMsS0FBS0osS0FBTCxDQUFXSyxTQUFyRCxFQUFnRSxLQUFLTixPQUFyRTtBQUNEOztBQUVEOzs7Ozs7OzhCQUdVO0FBQ1IsV0FBS0UsTUFBTCxDQUFZSyxZQUFaLENBQXlCQyxLQUF6QixDQUErQixLQUFLTixNQUFwQyxFQUE0Q08sU0FBNUM7QUFDRDs7QUFFRDs7Ozs7OzRCQUdRO0FBQ04sV0FBS1AsTUFBTCxDQUFZUSxrQkFBWixDQUErQkYsS0FBL0IsQ0FBcUMsS0FBS04sTUFBMUMsRUFBa0RPLFNBQWxEO0FBQ0Q7O0FBRUQ7Ozs7Ozs4QkFHVTtBQUNSLFdBQUtQLE1BQUwsQ0FBWVMsb0JBQVosQ0FBaUNILEtBQWpDLENBQXVDLEtBQUtOLE1BQTVDLEVBQW9ETyxTQUFwRDtBQUNEOztBQUVEOzs7Ozs7NkJBR1M7QUFDUCxXQUFLUCxNQUFMLENBQVlVLG1CQUFaLENBQWdDSixLQUFoQyxDQUFzQyxLQUFLTixNQUEzQyxFQUFtRE8sU0FBbkQ7QUFDRDs7Ozs7O2tCQUlZWCxNIiwiZmlsZSI6IlZlcmlmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgbmV4bW8gZnJvbSAnLi9pbmRleCc7XG5cbmNsYXNzIFZlcmlmeSB7XG4gIFxuICAvKipcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogICAgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogICAgQWRkaXRpb24gVmVyaWZ5IG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjcmVkZW50aWFscywgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRlbnRpYWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgXG4gICAgLy8gVXNlZCB0byBmYWNpbGl0YXRlIHRlc3Rpbmcgb2YgdGhlIGNhbGwgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0XG4gICAgdGhpcy5fbmV4bW8gPSB0aGlzLm9wdGlvbnMubmV4bW9PdmVycmlkZSB8fCBuZXhtbztcbiAgICBcbiAgICB0aGlzLl9uZXhtby5pbml0aWFsaXplKHRoaXMuY3JlZHMuYXBpS2V5LCB0aGlzLmNyZWRzLmFwaVNlY3JldCwgdGhpcy5vcHRpb25zKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICByZXF1ZXN0KCkge1xuICAgIHRoaXMuX25leG1vLnZlcmlmeU51bWJlci5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBjaGVjaygpIHtcbiAgICB0aGlzLl9uZXhtby5jaGVja1ZlcmlmeVJlcXVlc3QuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgY29udHJvbCgpIHtcbiAgICB0aGlzLl9uZXhtby5jb250cm9sVmVyaWZ5UmVxdWVzdC5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBzZWFyY2goKSB7XG4gICAgdGhpcy5fbmV4bW8uc2VhcmNoVmVyaWZ5UmVxdWVzdC5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgVmVyaWZ5O1xuIl19