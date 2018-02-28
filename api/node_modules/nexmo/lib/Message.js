"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition SMS options.
   */
  function Message(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Message);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * TODO: document
   */


  _createClass(Message, [{
    key: "sendSms",
    value: function sendSms() {
      this._nexmo.sendTextMessage.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "sendBinaryMessage",
    value: function sendBinaryMessage() {
      this._nexmo.sendBinaryMessage.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "sendWapPushMessage",
    value: function sendWapPushMessage() {
      this._nexmo.sendWapPushMessage.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "shortcodeAlert",
    value: function shortcodeAlert() {
      this._nexmo.shortcodeAlert.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "shortcode2FA",
    value: function shortcode2FA() {
      this._nexmo.shortcode2FA.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: "shortcodeMarketing",
    value: function shortcodeMarketing() {
      this._nexmo.shortcodeMarketing.apply(this._nexmo, arguments);
    }
  }]);

  return Message;
}();

exports.default = Message;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzYWdlLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2UiLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJjcmVkcyIsIl9uZXhtbyIsIm5leG1vT3ZlcnJpZGUiLCJpbml0aWFsaXplIiwiYXBpS2V5IiwiYXBpU2VjcmV0Iiwic2VuZFRleHRNZXNzYWdlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJzZW5kQmluYXJ5TWVzc2FnZSIsInNlbmRXYXBQdXNoTWVzc2FnZSIsInNob3J0Y29kZUFsZXJ0Iiwic2hvcnRjb2RlMkZBIiwic2hvcnRjb2RlTWFya2V0aW5nIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFTUEsTztBQUNKOzs7Ozs7QUFNQSxtQkFBWUMsV0FBWixFQUF1QztBQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFBQTs7QUFDckMsU0FBS0MsS0FBTCxHQUFhRixXQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmOztBQUVBO0FBQ0EsU0FBS0UsTUFBTCxHQUFjLEtBQUtGLE9BQUwsQ0FBYUcsYUFBYixtQkFBZDs7QUFFQSxTQUFLRCxNQUFMLENBQVlFLFVBQVosQ0FBdUIsS0FBS0gsS0FBTCxDQUFXSSxNQUFsQyxFQUEwQyxLQUFLSixLQUFMLENBQVdLLFNBQXJELEVBQWdFLEtBQUtOLE9BQXJFO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OEJBR1U7QUFDUixXQUFLRSxNQUFMLENBQVlLLGVBQVosQ0FBNEJDLEtBQTVCLENBQWtDLEtBQUtOLE1BQXZDLEVBQStDTyxTQUEvQztBQUNEOztBQUVEOzs7Ozs7d0NBR29CO0FBQ2xCLFdBQUtQLE1BQUwsQ0FBWVEsaUJBQVosQ0FBOEJGLEtBQTlCLENBQW9DLEtBQUtOLE1BQXpDLEVBQWlETyxTQUFqRDtBQUNEOztBQUVEOzs7Ozs7eUNBR3FCO0FBQ25CLFdBQUtQLE1BQUwsQ0FBWVMsa0JBQVosQ0FBK0JILEtBQS9CLENBQXFDLEtBQUtOLE1BQTFDLEVBQWtETyxTQUFsRDtBQUNEOztBQUVEOzs7Ozs7cUNBR2lCO0FBQ2YsV0FBS1AsTUFBTCxDQUFZVSxjQUFaLENBQTJCSixLQUEzQixDQUFpQyxLQUFLTixNQUF0QyxFQUE4Q08sU0FBOUM7QUFDRDs7QUFFRDs7Ozs7O21DQUdlO0FBQ2IsV0FBS1AsTUFBTCxDQUFZVyxZQUFaLENBQXlCTCxLQUF6QixDQUErQixLQUFLTixNQUFwQyxFQUE0Q08sU0FBNUM7QUFDRDs7QUFFRDs7Ozs7O3lDQUdxQjtBQUNuQixXQUFLUCxNQUFMLENBQVlZLGtCQUFaLENBQStCTixLQUEvQixDQUFxQyxLQUFLTixNQUExQyxFQUFrRE8sU0FBbEQ7QUFDRDs7Ozs7O2tCQUlZWCxPIiwiZmlsZSI6Ik1lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IG5leG1vIGZyb20gJy4vaW5kZXgnO1xuXG5jbGFzcyBNZXNzYWdlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gICAqICAgIGNyZWRlbnRpYWxzIHRvIGJlIHVzZWQgd2hlbiBpbnRlcmFjdGluZyB3aXRoIHRoZSBBUEkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqICAgIEFkZGl0aW9uIFNNUyBvcHRpb25zLlxuICAgKi9cbiAgY29uc3RydWN0b3IoY3JlZGVudGlhbHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuY3JlZHMgPSBjcmVkZW50aWFscztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIFxuICAgIC8vIFVzZWQgdG8gZmFjaWxpdGF0ZSB0ZXN0aW5nIG9mIHRoZSBjYWxsIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdFxuICAgIHRoaXMuX25leG1vID0gdGhpcy5vcHRpb25zLm5leG1vT3ZlcnJpZGUgfHwgbmV4bW87XG4gICAgXG4gICAgdGhpcy5fbmV4bW8uaW5pdGlhbGl6ZSh0aGlzLmNyZWRzLmFwaUtleSwgdGhpcy5jcmVkcy5hcGlTZWNyZXQsIHRoaXMub3B0aW9ucyk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgc2VuZFNtcygpIHtcbiAgICB0aGlzLl9uZXhtby5zZW5kVGV4dE1lc3NhZ2UuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgc2VuZEJpbmFyeU1lc3NhZ2UoKSB7XG4gICAgdGhpcy5fbmV4bW8uc2VuZEJpbmFyeU1lc3NhZ2UuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBUT0RPOiBkb2N1bWVudFxuICAgKi9cbiAgc2VuZFdhcFB1c2hNZXNzYWdlKCkge1xuICAgIHRoaXMuX25leG1vLnNlbmRXYXBQdXNoTWVzc2FnZS5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBzaG9ydGNvZGVBbGVydCgpIHtcbiAgICB0aGlzLl9uZXhtby5zaG9ydGNvZGVBbGVydC5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBzaG9ydGNvZGUyRkEoKSB7XG4gICAgdGhpcy5fbmV4bW8uc2hvcnRjb2RlMkZBLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG4gIFxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIHNob3J0Y29kZU1hcmtldGluZygpIHtcbiAgICB0aGlzLl9uZXhtby5zaG9ydGNvZGVNYXJrZXRpbmcuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gIH1cbiAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2U7XG4iXX0=