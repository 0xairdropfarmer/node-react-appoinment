"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Number = function () {

  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition Number options.
   */
  function Number(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Number);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * TODO: document
   */


  _createClass(Number, [{
    key: "getPricing",
    value: function getPricing() {
      this._nexmo.getPricing.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "getPhonePricing",
    value: function getPhonePricing() {
      this._nexmo.getPhonePricing.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "get",
    value: function get() {
      this._nexmo.getNumbers.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "search",
    value: function search() {
      this._nexmo.searchNumbers.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "buy",
    value: function buy() {
      this._nexmo.buyNumber.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "cancel",
    value: function cancel() {
      this._nexmo.cancelNumber.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "update",
    value: function update() {
      this._nexmo.updateNumber.apply(this._nexmo, arguments);
    }
  }]);

  return Number;
}();

exports.default = Number;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9OdW1iZXIuanMiXSwibmFtZXMiOlsiTnVtYmVyIiwiY3JlZGVudGlhbHMiLCJvcHRpb25zIiwiY3JlZHMiLCJfbmV4bW8iLCJuZXhtb092ZXJyaWRlIiwiaW5pdGlhbGl6ZSIsImFwaUtleSIsImFwaVNlY3JldCIsImdldFByaWNpbmciLCJhcHBseSIsImFyZ3VtZW50cyIsImdldFBob25lUHJpY2luZyIsImdldE51bWJlcnMiLCJzZWFyY2hOdW1iZXJzIiwiYnV5TnVtYmVyIiwiY2FuY2VsTnVtYmVyIiwidXBkYXRlTnVtYmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFTUEsTTs7QUFFSjs7Ozs7O0FBTUEsa0JBQVlDLFdBQVosRUFBdUM7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3JDLFNBQUtDLEtBQUwsR0FBYUYsV0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQTtBQUNBLFNBQUtFLE1BQUwsR0FBYyxLQUFLRixPQUFMLENBQWFHLGFBQWIsbUJBQWQ7O0FBRUEsU0FBS0QsTUFBTCxDQUFZRSxVQUFaLENBQXVCLEtBQUtILEtBQUwsQ0FBV0ksTUFBbEMsRUFBMEMsS0FBS0osS0FBTCxDQUFXSyxTQUFyRCxFQUFnRSxLQUFLTixPQUFyRTtBQUNEOztBQUVEOzs7Ozs7O2lDQUdhO0FBQ1gsV0FBS0UsTUFBTCxDQUFZSyxVQUFaLENBQXVCQyxLQUF2QixDQUE2QixLQUFLTixNQUFsQyxFQUEwQ08sU0FBMUM7QUFDRDs7QUFFRDs7Ozs7O3NDQUdrQjtBQUNoQixXQUFLUCxNQUFMLENBQVlRLGVBQVosQ0FBNEJGLEtBQTVCLENBQWtDLEtBQUtOLE1BQXZDLEVBQStDTyxTQUEvQztBQUNEOztBQUVEOzs7Ozs7MEJBR007QUFDSixXQUFLUCxNQUFMLENBQVlTLFVBQVosQ0FBdUJILEtBQXZCLENBQTZCLEtBQUtOLE1BQWxDLEVBQTBDTyxTQUExQztBQUNEOztBQUVEOzs7Ozs7NkJBR1M7QUFDUCxXQUFLUCxNQUFMLENBQVlVLGFBQVosQ0FBMEJKLEtBQTFCLENBQWdDLEtBQUtOLE1BQXJDLEVBQTZDTyxTQUE3QztBQUNEOztBQUVEOzs7Ozs7MEJBR007QUFDSixXQUFLUCxNQUFMLENBQVlXLFNBQVosQ0FBc0JMLEtBQXRCLENBQTRCLEtBQUtOLE1BQWpDLEVBQXlDTyxTQUF6QztBQUNEOztBQUVEOzs7Ozs7NkJBR1M7QUFDUCxXQUFLUCxNQUFMLENBQVlZLFlBQVosQ0FBeUJOLEtBQXpCLENBQStCLEtBQUtOLE1BQXBDLEVBQTRDTyxTQUE1QztBQUNEOztBQUVEOzs7Ozs7NkJBR1M7QUFDUCxXQUFLUCxNQUFMLENBQVlhLFlBQVosQ0FBeUJQLEtBQXpCLENBQStCLEtBQUtOLE1BQXBDLEVBQTRDTyxTQUE1QztBQUNEOzs7Ozs7a0JBSVlYLE0iLCJmaWxlIjoiTnVtYmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBuZXhtbyBmcm9tICcuL2luZGV4JztcblxuY2xhc3MgTnVtYmVyIHtcbiAgXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFsc1xuICAgKiAgICBjcmVkZW50aWFscyB0byBiZSB1c2VkIHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCB0aGUgQVBJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiAgICBBZGRpdGlvbiBOdW1iZXIgb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNyZWRlbnRpYWxzLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmNyZWRzID0gY3JlZGVudGlhbHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICBcbiAgICAvLyBVc2VkIHRvIGZhY2lsaXRhdGUgdGVzdGluZyBvZiB0aGUgY2FsbCB0byB0aGUgdW5kZXJseWluZyBvYmplY3RcbiAgICB0aGlzLl9uZXhtbyA9IHRoaXMub3B0aW9ucy5uZXhtb092ZXJyaWRlIHx8IG5leG1vO1xuICAgIFxuICAgIHRoaXMuX25leG1vLmluaXRpYWxpemUodGhpcy5jcmVkcy5hcGlLZXksIHRoaXMuY3JlZHMuYXBpU2VjcmV0LCB0aGlzLm9wdGlvbnMpO1xuICB9XG4gIFxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIGdldFByaWNpbmcoKSB7XG4gICAgdGhpcy5fbmV4bW8uZ2V0UHJpY2luZy5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBnZXRQaG9uZVByaWNpbmcoKSB7XG4gICAgdGhpcy5fbmV4bW8uZ2V0UGhvbmVQcmljaW5nLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG4gIFxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIGdldCgpIHtcbiAgICB0aGlzLl9uZXhtby5nZXROdW1iZXJzLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG4gIFxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLl9uZXhtby5zZWFyY2hOdW1iZXJzLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG4gIFxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIGJ1eSgpIHtcbiAgICB0aGlzLl9uZXhtby5idXlOdW1iZXIuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgY2FuY2VsKCkge1xuICAgIHRoaXMuX25leG1vLmNhbmNlbE51bWJlci5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5fbmV4bW8udXBkYXRlTnVtYmVyLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG4gIFxufVxuXG5leHBvcnQgZGVmYXVsdCBOdW1iZXI7XG4iXX0=