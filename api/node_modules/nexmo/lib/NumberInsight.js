"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NumberInsight = function () {

  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition NumberInsight options.
   */
  function NumberInsight(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, NumberInsight);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * Get insight on the provided number.
   *
   * @param {Object} options - The options for Number Insight
   * @param {string} options.level - the level of insight: 'basic', 'standard'
   *                 or 'advanced'.
   *                 If no `level` value is provided, or an unrecognised value
   *                 is used, 'basic' level insight will be used.
   * @param {string} options.number - the phone number to retrieve insight on
   * @param {string} options.country - 'basic' and 'standard' only.
   *                 An ISO 3166 Alpha 2 country code
   *                 https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   * @param {string} options. ip - 'advanced' only.
   *                 The IP address in IPv4 notation of the endpoint the
   *                 user connected from.
   * @param {Array}  options.features - 'advanced' only.
   *                 An Array detailing the information you want for this phone
   *                 number. Possible Array elements are:
   *                 - type: number is one of the following: mobile, landline,
   *                          landline_premium or unknown phone number.
   *                 - valid: number exists.
   *                 - reachable: is number available now.
   *                 - carrier: the MCCMNC for the carrier number is registered
   *                             with. This is either: <ISO country code>-FIXED
   *                             or <ISO country code>-PREMIUM.
   *                 - ported: if the user has changed carrier for number.
   *                 - roaming: the subscriber is outside their home network
   *
   * @param {string} options.callback - 'advanced' only.
   *                 The callback to be called when the API call completes.
   * @param {Number} options.callback_timeout - 'advanced' only.
   *                 The maximum wait until the Number Insight Return Parameters
   *                 are sent to callback. This is a value between 1000 - 30000ms
   *                 inclusive. The default is 30000 ms.
   * @param {string} options.callback_method - 'advanced' only.
   *                 The HTTP method used to send the Number Insight Return
   *                 Parameters to callback. Must be GET or POST. The default
   *                 value is GET.
   * @param {string} options.client_ref - 'advanced' only.
   *                 A 40 character reference string returned in the Number
   *                 Insight Return Parameters. This may be useful for your
   *                 internal reports.
   * @param {string} options['include-intermediate-callbacks'] - 'advanced' only.
   *                 Tells the Nexmo platform to make callbacks as soon as an
   *                 individual piece of information is retrieved.
   */


  _createClass(NumberInsight, [{
    key: 'get',
    value: function get(options, callback) {
      var level = options.level;
      // remove 'level' as it's a library-only parameter
      delete options.level;

      if (level === 'advanced' || level === 'advancedAsync') {
        if (level === 'advanced') {
          console.warn('DEPRECATION WARNING: Number Insight Advanced with a level of "advanced" will be synchronous in v2.0+. Consider using the level "advancedAsync" to keep using the async option.');
        };
        this._nexmo.numberInsightAdvancedAsync.apply(this._nexmo, arguments);
      } else if (level === 'advancedSync') {
        this._nexmo.numberInsightAdvanced.apply(this._nexmo, arguments);
      } else if (level === 'standard') {
        this._nexmo.numberInsightStandard.apply(this._nexmo, arguments);
      } else {
        this._nexmo.numberInsightBasic.apply(this._nexmo, arguments);
      }
    }
  }]);

  return NumberInsight;
}();

exports.default = NumberInsight;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9OdW1iZXJJbnNpZ2h0LmpzIl0sIm5hbWVzIjpbIk51bWJlckluc2lnaHQiLCJjcmVkZW50aWFscyIsIm9wdGlvbnMiLCJjcmVkcyIsIl9uZXhtbyIsIm5leG1vT3ZlcnJpZGUiLCJpbml0aWFsaXplIiwiYXBpS2V5IiwiYXBpU2VjcmV0IiwiY2FsbGJhY2siLCJsZXZlbCIsImNvbnNvbGUiLCJ3YXJuIiwibnVtYmVySW5zaWdodEFkdmFuY2VkQXN5bmMiLCJhcHBseSIsImFyZ3VtZW50cyIsIm51bWJlckluc2lnaHRBZHZhbmNlZCIsIm51bWJlckluc2lnaHRTdGFuZGFyZCIsIm51bWJlckluc2lnaHRCYXNpYyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7O0lBRU1BLGE7O0FBRUo7Ozs7OztBQU1BLHlCQUFZQyxXQUFaLEVBQXVDO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUNyQyxTQUFLQyxLQUFMLEdBQWFGLFdBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7O0FBRUE7QUFDQSxTQUFLRSxNQUFMLEdBQWMsS0FBS0YsT0FBTCxDQUFhRyxhQUFiLG1CQUFkOztBQUVBLFNBQUtELE1BQUwsQ0FBWUUsVUFBWixDQUF1QixLQUFLSCxLQUFMLENBQVdJLE1BQWxDLEVBQTBDLEtBQUtKLEtBQUwsQ0FBV0ssU0FBckQsRUFBZ0UsS0FBS04sT0FBckU7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBOENJQSxPLEVBQVNPLFEsRUFBVTtBQUNyQixVQUFJQyxRQUFRUixRQUFRUSxLQUFwQjtBQUNBO0FBQ0EsYUFBT1IsUUFBUVEsS0FBZjs7QUFFQSxVQUFJQSxVQUFVLFVBQVYsSUFBd0JBLFVBQVUsZUFBdEMsRUFBdUQ7QUFDckQsWUFBSUEsVUFBVSxVQUFkLEVBQTBCO0FBQUVDLGtCQUFRQyxJQUFSLENBQWEsZ0xBQWI7QUFBZ007QUFDNU4sYUFBS1IsTUFBTCxDQUFZUywwQkFBWixDQUF1Q0MsS0FBdkMsQ0FBNkMsS0FBS1YsTUFBbEQsRUFBMERXLFNBQTFEO0FBQ0QsT0FIRCxNQUlLLElBQUdMLFVBQVUsY0FBYixFQUE2QjtBQUNoQyxhQUFLTixNQUFMLENBQVlZLHFCQUFaLENBQWtDRixLQUFsQyxDQUF3QyxLQUFLVixNQUE3QyxFQUFxRFcsU0FBckQ7QUFDRCxPQUZJLE1BR0EsSUFBR0wsVUFBVSxVQUFiLEVBQXlCO0FBQzVCLGFBQUtOLE1BQUwsQ0FBWWEscUJBQVosQ0FBa0NILEtBQWxDLENBQXdDLEtBQUtWLE1BQTdDLEVBQXFEVyxTQUFyRDtBQUNELE9BRkksTUFHQTtBQUNILGFBQUtYLE1BQUwsQ0FBWWMsa0JBQVosQ0FBK0JKLEtBQS9CLENBQXFDLEtBQUtWLE1BQTFDLEVBQWtEVyxTQUFsRDtBQUNEO0FBQ0Y7Ozs7OztrQkFJWWYsYSIsImZpbGUiOiJOdW1iZXJJbnNpZ2h0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBuZXhtbyBmcm9tICcuL2luZGV4JztcblxuY2xhc3MgTnVtYmVySW5zaWdodCB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gICAqICAgIGNyZWRlbnRpYWxzIHRvIGJlIHVzZWQgd2hlbiBpbnRlcmFjdGluZyB3aXRoIHRoZSBBUEkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqICAgIEFkZGl0aW9uIE51bWJlckluc2lnaHQgb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNyZWRlbnRpYWxzLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmNyZWRzID0gY3JlZGVudGlhbHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIC8vIFVzZWQgdG8gZmFjaWxpdGF0ZSB0ZXN0aW5nIG9mIHRoZSBjYWxsIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdFxuICAgIHRoaXMuX25leG1vID0gdGhpcy5vcHRpb25zLm5leG1vT3ZlcnJpZGUgfHwgbmV4bW87XG5cbiAgICB0aGlzLl9uZXhtby5pbml0aWFsaXplKHRoaXMuY3JlZHMuYXBpS2V5LCB0aGlzLmNyZWRzLmFwaVNlY3JldCwgdGhpcy5vcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5zaWdodCBvbiB0aGUgcHJvdmlkZWQgbnVtYmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBOdW1iZXIgSW5zaWdodFxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5sZXZlbCAtIHRoZSBsZXZlbCBvZiBpbnNpZ2h0OiAnYmFzaWMnLCAnc3RhbmRhcmQnXG4gICAqICAgICAgICAgICAgICAgICBvciAnYWR2YW5jZWQnLlxuICAgKiAgICAgICAgICAgICAgICAgSWYgbm8gYGxldmVsYCB2YWx1ZSBpcyBwcm92aWRlZCwgb3IgYW4gdW5yZWNvZ25pc2VkIHZhbHVlXG4gICAqICAgICAgICAgICAgICAgICBpcyB1c2VkLCAnYmFzaWMnIGxldmVsIGluc2lnaHQgd2lsbCBiZSB1c2VkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5udW1iZXIgLSB0aGUgcGhvbmUgbnVtYmVyIHRvIHJldHJpZXZlIGluc2lnaHQgb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY291bnRyeSAtICdiYXNpYycgYW5kICdzdGFuZGFyZCcgb25seS5cbiAgICogICAgICAgICAgICAgICAgIEFuIElTTyAzMTY2IEFscGhhIDIgY291bnRyeSBjb2RlXG4gICAqICAgICAgICAgICAgICAgICBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fMzE2Ni0xX2FscGhhLTJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuIGlwIC0gJ2FkdmFuY2VkJyBvbmx5LlxuICAgKiAgICAgICAgICAgICAgICAgVGhlIElQIGFkZHJlc3MgaW4gSVB2NCBub3RhdGlvbiBvZiB0aGUgZW5kcG9pbnQgdGhlXG4gICAqICAgICAgICAgICAgICAgICB1c2VyIGNvbm5lY3RlZCBmcm9tLlxuICAgKiBAcGFyYW0ge0FycmF5fSAgb3B0aW9ucy5mZWF0dXJlcyAtICdhZHZhbmNlZCcgb25seS5cbiAgICogICAgICAgICAgICAgICAgIEFuIEFycmF5IGRldGFpbGluZyB0aGUgaW5mb3JtYXRpb24geW91IHdhbnQgZm9yIHRoaXMgcGhvbmVcbiAgICogICAgICAgICAgICAgICAgIG51bWJlci4gUG9zc2libGUgQXJyYXkgZWxlbWVudHMgYXJlOlxuICAgKiAgICAgICAgICAgICAgICAgLSB0eXBlOiBudW1iZXIgaXMgb25lIG9mIHRoZSBmb2xsb3dpbmc6IG1vYmlsZSwgbGFuZGxpbmUsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5kbGluZV9wcmVtaXVtIG9yIHVua25vd24gcGhvbmUgbnVtYmVyLlxuICAgKiAgICAgICAgICAgICAgICAgLSB2YWxpZDogbnVtYmVyIGV4aXN0cy5cbiAgICogICAgICAgICAgICAgICAgIC0gcmVhY2hhYmxlOiBpcyBudW1iZXIgYXZhaWxhYmxlIG5vdy5cbiAgICogICAgICAgICAgICAgICAgIC0gY2FycmllcjogdGhlIE1DQ01OQyBmb3IgdGhlIGNhcnJpZXIgbnVtYmVyIGlzIHJlZ2lzdGVyZWRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGguIFRoaXMgaXMgZWl0aGVyOiA8SVNPIGNvdW50cnkgY29kZT4tRklYRURcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIDxJU08gY291bnRyeSBjb2RlPi1QUkVNSVVNLlxuICAgKiAgICAgICAgICAgICAgICAgLSBwb3J0ZWQ6IGlmIHRoZSB1c2VyIGhhcyBjaGFuZ2VkIGNhcnJpZXIgZm9yIG51bWJlci5cbiAgICogICAgICAgICAgICAgICAgIC0gcm9hbWluZzogdGhlIHN1YnNjcmliZXIgaXMgb3V0c2lkZSB0aGVpciBob21lIG5ldHdvcmtcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY2FsbGJhY2sgLSAnYWR2YW5jZWQnIG9ubHkuXG4gICAqICAgICAgICAgICAgICAgICBUaGUgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIEFQSSBjYWxsIGNvbXBsZXRlcy5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuY2FsbGJhY2tfdGltZW91dCAtICdhZHZhbmNlZCcgb25seS5cbiAgICogICAgICAgICAgICAgICAgIFRoZSBtYXhpbXVtIHdhaXQgdW50aWwgdGhlIE51bWJlciBJbnNpZ2h0IFJldHVybiBQYXJhbWV0ZXJzXG4gICAqICAgICAgICAgICAgICAgICBhcmUgc2VudCB0byBjYWxsYmFjay4gVGhpcyBpcyBhIHZhbHVlIGJldHdlZW4gMTAwMCAtIDMwMDAwbXNcbiAgICogICAgICAgICAgICAgICAgIGluY2x1c2l2ZS4gVGhlIGRlZmF1bHQgaXMgMzAwMDAgbXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNhbGxiYWNrX21ldGhvZCAtICdhZHZhbmNlZCcgb25seS5cbiAgICogICAgICAgICAgICAgICAgIFRoZSBIVFRQIG1ldGhvZCB1c2VkIHRvIHNlbmQgdGhlIE51bWJlciBJbnNpZ2h0IFJldHVyblxuICAgKiAgICAgICAgICAgICAgICAgUGFyYW1ldGVycyB0byBjYWxsYmFjay4gTXVzdCBiZSBHRVQgb3IgUE9TVC4gVGhlIGRlZmF1bHRcbiAgICogICAgICAgICAgICAgICAgIHZhbHVlIGlzIEdFVC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY2xpZW50X3JlZiAtICdhZHZhbmNlZCcgb25seS5cbiAgICogICAgICAgICAgICAgICAgIEEgNDAgY2hhcmFjdGVyIHJlZmVyZW5jZSBzdHJpbmcgcmV0dXJuZWQgaW4gdGhlIE51bWJlclxuICAgKiAgICAgICAgICAgICAgICAgSW5zaWdodCBSZXR1cm4gUGFyYW1ldGVycy4gVGhpcyBtYXkgYmUgdXNlZnVsIGZvciB5b3VyXG4gICAqICAgICAgICAgICAgICAgICBpbnRlcm5hbCByZXBvcnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uc1snaW5jbHVkZS1pbnRlcm1lZGlhdGUtY2FsbGJhY2tzJ10gLSAnYWR2YW5jZWQnIG9ubHkuXG4gICAqICAgICAgICAgICAgICAgICBUZWxscyB0aGUgTmV4bW8gcGxhdGZvcm0gdG8gbWFrZSBjYWxsYmFja3MgYXMgc29vbiBhcyBhblxuICAgKiAgICAgICAgICAgICAgICAgaW5kaXZpZHVhbCBwaWVjZSBvZiBpbmZvcm1hdGlvbiBpcyByZXRyaWV2ZWQuXG4gICAqL1xuICBnZXQob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgbGV2ZWwgPSBvcHRpb25zLmxldmVsO1xuICAgIC8vIHJlbW92ZSAnbGV2ZWwnIGFzIGl0J3MgYSBsaWJyYXJ5LW9ubHkgcGFyYW1ldGVyXG4gICAgZGVsZXRlIG9wdGlvbnMubGV2ZWw7XG5cbiAgICBpZiAobGV2ZWwgPT09ICdhZHZhbmNlZCcgfHwgbGV2ZWwgPT09ICdhZHZhbmNlZEFzeW5jJykge1xuICAgICAgaWYgKGxldmVsID09PSAnYWR2YW5jZWQnKSB7IGNvbnNvbGUud2FybignREVQUkVDQVRJT04gV0FSTklORzogTnVtYmVyIEluc2lnaHQgQWR2YW5jZWQgd2l0aCBhIGxldmVsIG9mIFwiYWR2YW5jZWRcIiB3aWxsIGJlIHN5bmNocm9ub3VzIGluIHYyLjArLiBDb25zaWRlciB1c2luZyB0aGUgbGV2ZWwgXCJhZHZhbmNlZEFzeW5jXCIgdG8ga2VlcCB1c2luZyB0aGUgYXN5bmMgb3B0aW9uLicpIH07XG4gICAgICB0aGlzLl9uZXhtby5udW1iZXJJbnNpZ2h0QWR2YW5jZWRBc3luYy5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgZWxzZSBpZihsZXZlbCA9PT0gJ2FkdmFuY2VkU3luYycpIHtcbiAgICAgIHRoaXMuX25leG1vLm51bWJlckluc2lnaHRBZHZhbmNlZC5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgZWxzZSBpZihsZXZlbCA9PT0gJ3N0YW5kYXJkJykge1xuICAgICAgdGhpcy5fbmV4bW8ubnVtYmVySW5zaWdodFN0YW5kYXJkLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX25leG1vLm51bWJlckluc2lnaHRCYXNpYy5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJJbnNpZ2h0O1xuIl19