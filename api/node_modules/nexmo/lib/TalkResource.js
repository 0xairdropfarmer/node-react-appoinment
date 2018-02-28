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
 * Provides access to the `talk` resource.
 */
var TalkResource = function () {
  _createClass(TalkResource, null, [{
    key: 'PATH',


    /**
     * The path to the `talk` resource.
     */
    get: function get() {
      return '/v1/calls/{call_uuid}/talk';
    }

    /**
     * Creates a new TalkResource.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function TalkResource(creds, options) {
    _classCallCheck(this, TalkResource);

    this.creds = creds;
    this.options = options;
  }

  /**
   * Starts a talk in a call.
   *
   * @param {Object} params - Parameters used when starting the talk. See https://docs.dev.nexmoinc.net/voice/voice-api/api-reference#talk_put for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(TalkResource, [{
    key: 'start',
    value: function start(callId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: 'api.nexmo.com',
        path: TalkResource.PATH.replace('{call_uuid}', callId),
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
     * Stop a talk in a call.
     *
     * @param {string} callId - The unique identifier for the call for the talk to be stopped in.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: 'stop',
    value: function stop(callId, callback) {
      var config = {
        host: 'api.nexmo.com',
        path: TalkResource.PATH.replace('{call_uuid}', callId),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }
  }]);

  return TalkResource;
}();

exports.default = TalkResource;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UYWxrUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiVGFsa1Jlc291cmNlIiwiY3JlZHMiLCJvcHRpb25zIiwiY2FsbElkIiwicGFyYW1zIiwiY2FsbGJhY2siLCJKU09OIiwic3RyaW5naWZ5IiwiY29uZmlnIiwiaG9zdCIsInBhdGgiLCJQQVRIIiwicmVwbGFjZSIsIm1ldGhvZCIsImJvZHkiLCJoZWFkZXJzIiwibGVuZ3RoIiwiZ2VuZXJhdGVKd3QiLCJodHRwQ2xpZW50IiwicmVxdWVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLFk7Ozs7O0FBRUo7Ozt3QkFHa0I7QUFDaEIsYUFBTyw0QkFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7QUFNQSx3QkFBWUMsS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7QUFBQTs7QUFDMUIsU0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7MEJBTU1DLE0sRUFBUUMsTSxFQUFRQyxRLEVBQVU7QUFDOUJELGVBQVNFLEtBQUtDLFNBQUwsQ0FBZUgsTUFBZixDQUFUOztBQUVBLFVBQUlJLFNBQVM7QUFDWEMsY0FBTSxlQURLO0FBRVhDLGNBQU1WLGFBQWFXLElBQWIsQ0FBa0JDLE9BQWxCLENBQTBCLGFBQTFCLEVBQXlDVCxNQUF6QyxDQUZLO0FBR1hVLGdCQUFRLEtBSEc7QUFJWEMsY0FBTVYsTUFKSztBQUtYVyxpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQLDRCQUFrQlgsT0FBT1ksTUFGbEI7QUFHUCx1Q0FBMkIsS0FBS2YsS0FBTCxDQUFXZ0IsV0FBWDtBQUhwQjtBQUxFLE9BQWI7QUFXQSxXQUFLZixPQUFMLENBQWFnQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1gsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozt5QkFNS0YsTSxFQUFRRSxRLEVBQVU7QUFDckIsVUFBSUcsU0FBUztBQUNYQyxjQUFLLGVBRE07QUFFWEMsY0FBTVYsYUFBYVcsSUFBYixDQUFrQkMsT0FBbEIsQ0FBMEIsYUFBMUIsRUFBeUNULE1BQXpDLENBRks7QUFHWFUsZ0JBQVEsUUFIRztBQUlYRSxpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQLHVDQUEyQixLQUFLZCxLQUFMLENBQVdnQixXQUFYO0FBRnBCO0FBSkUsT0FBYjtBQVNBLFdBQUtmLE9BQUwsQ0FBYWdCLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDWCxNQUFoQyxFQUF3Q0gsUUFBeEM7QUFDRDs7Ozs7O2tCQUlZTCxZIiwiZmlsZSI6IlRhbGtSZXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBxdWVyeXN0cmluZyBmcm9tICdxdWVyeXN0cmluZyc7XG5cbi8qKlxuICogUHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBgdGFsa2AgcmVzb3VyY2UuXG4gKi9cbmNsYXNzIFRhbGtSZXNvdXJjZSB7XG4gIFxuICAvKipcbiAgICogVGhlIHBhdGggdG8gdGhlIGB0YWxrYCByZXNvdXJjZS5cbiAgICovXG4gIHN0YXRpYyBnZXQgUEFUSCgpIHtcbiAgICByZXR1cm4gJy92MS9jYWxscy97Y2FsbF91dWlkfS90YWxrJztcbiAgfVxuICBcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgVGFsa1Jlc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkcyAtIENyZWRlbnRpYWxzIHVzZWQgd2hlbiBpbnRlcmFjdGluZyB3aXRoIHRoZSBOZXhtbyBBUEkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gYWRkaXRpb25hbCBvcHRpb25zIGZvciB0aGUgY2xhc3MuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjcmVkcywgb3B0aW9ucykge1xuICAgIHRoaXMuY3JlZHMgPSBjcmVkcztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG4gIFxuICAvKipcbiAgICogU3RhcnRzIGEgdGFsayBpbiBhIGNhbGwuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBQYXJhbWV0ZXJzIHVzZWQgd2hlbiBzdGFydGluZyB0aGUgdGFsay4gU2VlIGh0dHBzOi8vZG9jcy5kZXYubmV4bW9pbmMubmV0L3ZvaWNlL3ZvaWNlLWFwaS9hcGktcmVmZXJlbmNlI3RhbGtfcHV0IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSByZXF1ZXN0IGNvbXBsZXRlcy5cbiAgICovXG4gIHN0YXJ0KGNhbGxJZCwgcGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHBhcmFtcyA9IEpTT04uc3RyaW5naWZ5KHBhcmFtcyk7XG5cbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgaG9zdDogJ2FwaS5uZXhtby5jb20nLFxuICAgICAgcGF0aDogVGFsa1Jlc291cmNlLlBBVEgucmVwbGFjZSgne2NhbGxfdXVpZH0nLCBjYWxsSWQpLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogcGFyYW1zLmxlbmd0aCxcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBTdG9wIGEgdGFsayBpbiBhIGNhbGwuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjYWxsSWQgLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBjYWxsIGZvciB0aGUgdGFsayB0byBiZSBzdG9wcGVkIGluLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSByZXF1ZXN0IGNvbXBsZXRlcy5cbiAgICovXG4gIHN0b3AoY2FsbElkLCBjYWxsYmFjaykge1xuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OidhcGkubmV4bW8uY29tJyxcbiAgICAgIHBhdGg6IFRhbGtSZXNvdXJjZS5QQVRILnJlcGxhY2UoJ3tjYWxsX3V1aWR9JywgY2FsbElkKSxcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3RoaXMuY3JlZHMuZ2VuZXJhdGVKd3QoKX1gXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG4gIFxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWxrUmVzb3VyY2U7XG4iXX0=