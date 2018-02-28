'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides access to the `stream` resource.
 */
var StreamResource = function () {
  _createClass(StreamResource, null, [{
    key: 'PATH',


    /**
     * The path to the `stream` resource.
     */
    get: function get() {
      return '/v1/calls/{call_uuid}/stream';
    }

    /**
     * Creates a new StreamResource.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function StreamResource(creds, options) {
    _classCallCheck(this, StreamResource);

    this.creds = creds;
    this.options = options;
  }

  /**
   * Starts a stream in a call.
   *
   * @param {Object} params - Parameters used when starting the stream. See https://docs.dev.nexmoinc.net/voice/voice-api/api-reference#stream_put for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(StreamResource, [{
    key: 'start',
    value: function start(callId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: 'api.nexmo.com',
        path: StreamResource.PATH.replace('{call_uuid}', callId),
        method: 'PUT',
        body: params,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': params.length,
          'Authorization': 'Bearer ' + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }

    /**
     * Stop a stream in a call.
     *
     * @param {string} callId - The unique identifier for the call for the stream to be stopped in.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: 'stop',
    value: function stop(callId, callback) {
      var config = {
        host: 'api.nexmo.com',
        path: StreamResource.PATH.replace('{call_uuid}', callId),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }
  }]);

  return StreamResource;
}();

exports.default = StreamResource;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TdHJlYW1SZXNvdXJjZS5qcyJdLCJuYW1lcyI6WyJTdHJlYW1SZXNvdXJjZSIsImNyZWRzIiwib3B0aW9ucyIsImNhbGxJZCIsInBhcmFtcyIsImNhbGxiYWNrIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbmZpZyIsImhvc3QiLCJwYXRoIiwiUEFUSCIsInJlcGxhY2UiLCJtZXRob2QiLCJib2R5IiwiaGVhZGVycyIsImxlbmd0aCIsImdlbmVyYXRlSnd0IiwiaHR0cENsaWVudCIsInJlcXVlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7OztJQUdNQSxjOzs7OztBQUVKOzs7d0JBR2tCO0FBQ2hCLGFBQU8sOEJBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O0FBTUEsMEJBQVlDLEtBQVosRUFBbUJDLE9BQW5CLEVBQTRCO0FBQUE7O0FBQzFCLFNBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNEOztBQUVEOzs7Ozs7Ozs7OzBCQU1NQyxNLEVBQVFDLE0sRUFBUUMsUSxFQUFVO0FBQzlCRCxlQUFTRSxLQUFLQyxTQUFMLENBQWVILE1BQWYsQ0FBVDs7QUFFQSxVQUFJSSxTQUFTO0FBQ1hDLGNBQU0sZUFESztBQUVYQyxjQUFNVixlQUFlVyxJQUFmLENBQW9CQyxPQUFwQixDQUE0QixhQUE1QixFQUEyQ1QsTUFBM0MsQ0FGSztBQUdYVSxnQkFBUSxLQUhHO0FBSVhDLGNBQU1WLE1BSks7QUFLWFcsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUCw0QkFBa0JYLE9BQU9ZLE1BRmxCO0FBR1AsdUNBQTJCLEtBQUtmLEtBQUwsQ0FBV2dCLFdBQVg7QUFIcEI7QUFMRSxPQUFiO0FBV0EsV0FBS2YsT0FBTCxDQUFhZ0IsVUFBYixDQUF3QkMsT0FBeEIsQ0FBZ0NYLE1BQWhDLEVBQXdDSCxRQUF4QztBQUNEOztBQUVEOzs7Ozs7Ozs7eUJBTUtGLE0sRUFBUUUsUSxFQUFVO0FBQ3JCLFVBQUlHLFNBQVM7QUFDWEMsY0FBSyxlQURNO0FBRVhDLGNBQU1WLGVBQWVXLElBQWYsQ0FBb0JDLE9BQXBCLENBQTRCLGFBQTVCLEVBQTJDVCxNQUEzQyxDQUZLO0FBR1hVLGdCQUFRLFFBSEc7QUFJWEUsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUCx1Q0FBMkIsS0FBS2QsS0FBTCxDQUFXZ0IsV0FBWDtBQUZwQjtBQUpFLE9BQWI7QUFTQSxXQUFLZixPQUFMLENBQWFnQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1gsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7Ozs7OztrQkFJWUwsYyIsImZpbGUiOiJTdHJlYW1SZXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBxdWVyeXN0cmluZyBmcm9tICdxdWVyeXN0cmluZyc7XG5cbi8qKlxuICogUHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBgc3RyZWFtYCByZXNvdXJjZS5cbiAqL1xuY2xhc3MgU3RyZWFtUmVzb3VyY2Uge1xuICBcbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRvIHRoZSBgc3RyZWFtYCByZXNvdXJjZS5cbiAgICovXG4gIHN0YXRpYyBnZXQgUEFUSCgpIHtcbiAgICByZXR1cm4gJy92MS9jYWxscy97Y2FsbF91dWlkfS9zdHJlYW0nO1xuICB9XG4gIFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBTdHJlYW1SZXNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZHMgLSBDcmVkZW50aWFscyB1c2VkIHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCB0aGUgTmV4bW8gQVBJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgb3B0aW9ucyBmb3IgdGhlIGNsYXNzLlxuICAgKi9cbiAgY29uc3RydWN0b3IoY3JlZHMsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNyZWRzID0gY3JlZHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuICBcbiAgLyoqXG4gICAqIFN0YXJ0cyBhIHN0cmVhbSBpbiBhIGNhbGwuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBQYXJhbWV0ZXJzIHVzZWQgd2hlbiBzdGFydGluZyB0aGUgc3RyZWFtLiBTZWUgaHR0cHM6Ly9kb2NzLmRldi5uZXhtb2luYy5uZXQvdm9pY2Uvdm9pY2UtYXBpL2FwaS1yZWZlcmVuY2Ujc3RyZWFtX3B1dCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBzdGFydChjYWxsSWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBwYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIGhvc3Q6ICdhcGkubmV4bW8uY29tJyxcbiAgICAgIHBhdGg6IFN0cmVhbVJlc291cmNlLlBBVEgucmVwbGFjZSgne2NhbGxfdXVpZH0nLCBjYWxsSWQpLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogcGFyYW1zLmxlbmd0aCxcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBTdG9wIGEgc3RyZWFtIGluIGEgY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhbGxJZCAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGNhbGwgZm9yIHRoZSBzdHJlYW0gdG8gYmUgc3RvcHBlZCBpbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBzdG9wKGNhbGxJZCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgaG9zdDonYXBpLm5leG1vLmNvbScsXG4gICAgICBwYXRoOiBTdHJlYW1SZXNvdXJjZS5QQVRILnJlcGxhY2UoJ3tjYWxsX3V1aWR9JywgY2FsbElkKSxcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3RoaXMuY3JlZHMuZ2VuZXJhdGVKd3QoKX1gXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG4gIFxufVxuXG5leHBvcnQgZGVmYXVsdCBTdHJlYW1SZXNvdXJjZTtcbiJdfQ==