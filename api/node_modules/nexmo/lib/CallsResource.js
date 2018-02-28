'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _StreamResource = require('./StreamResource');

var _StreamResource2 = _interopRequireDefault(_StreamResource);

var _TalkResource = require('./TalkResource');

var _TalkResource2 = _interopRequireDefault(_TalkResource);

var _DtmfResource = require('./DtmfResource');

var _DtmfResource2 = _interopRequireDefault(_DtmfResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides access to the `calls` resource.
 */
var CallsResource = function () {
  _createClass(CallsResource, null, [{
    key: 'PATH',


    /**
     * The path to the `calls` resource.
     */
    get: function get() {
      return '/v1/calls';
    }

    /**
     * Creates a new CallsResource.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function CallsResource(creds, options) {
    _classCallCheck(this, CallsResource);

    this.creds = creds;
    this.options = options;

    /**
     * @type StreamController
     */
    this.stream = new _StreamResource2.default(this.creds, this.options);

    /**
     * @type TalkResource
     */
    this.talk = new _TalkResource2.default(this.creds, this.options);

    /**
     * @type DtmfResource
     */
    this.dtmf = new _DtmfResource2.default(this.creds, this.options);
  }

  /**
   * Create a new call.
   *
   * @param {Object} params - Parameters used when creating the call. See https://docs.dev.nexmoinc.net/voice/voice-api/api-reference#call_create for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(CallsResource, [{
    key: 'create',
    value: function create(params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: 'api.nexmo.com',
        path: CallsResource.PATH,
        method: 'POST',
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
     * Get an existing call.
     *
     * @param {string|object} query - The unique identifier for the call to retrieve
     *               or a set of filter parameters for the query. For more information
     *               see https://docs.nexmo.com/voice/voice-api/api-reference#call_retrieve
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: 'get',
    value: function get(query, callback) {
      if (!query) {
        throw new Error('"query" is a required parameter');
      }

      var pathExt = '';
      if (typeof query === 'string') {
        // single call Id
        pathExt = '/' + query;
      } else if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object' && Object.keys(query).length > 0) {
        // filter
        pathExt = '?' + _querystring2.default.stringify(query);
      }

      var config = {
        host: 'api.nexmo.com',
        path: '' + CallsResource.PATH + pathExt,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.creds.generateJwt()
        }
      };
      this.options.httpClient.request(config, callback);
    }

    /**
     * Update an existing call.
     *
     * @param {string} [callId] - The unique identifier for the call to update.
     * @param {Object} params - Parameters used when updating the call. See https://docs.dev.nexmoinc.net/voice/voice-api/api-reference#call_modify_single for more information.
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: 'update',
    value: function update(callId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: 'api.nexmo.com',
        path: CallsResource.PATH + '/' + callId,
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
  }]);

  return CallsResource;
}();

exports.default = CallsResource;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWxsc1Jlc291cmNlLmpzIl0sIm5hbWVzIjpbIkNhbGxzUmVzb3VyY2UiLCJjcmVkcyIsIm9wdGlvbnMiLCJzdHJlYW0iLCJ0YWxrIiwiZHRtZiIsInBhcmFtcyIsImNhbGxiYWNrIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbmZpZyIsImhvc3QiLCJwYXRoIiwiUEFUSCIsIm1ldGhvZCIsImJvZHkiLCJoZWFkZXJzIiwibGVuZ3RoIiwiZ2VuZXJhdGVKd3QiLCJodHRwQ2xpZW50IiwicmVxdWVzdCIsInF1ZXJ5IiwiRXJyb3IiLCJwYXRoRXh0IiwiT2JqZWN0Iiwia2V5cyIsImNhbGxJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7SUFHTUEsYTs7Ozs7QUFFSjs7O3dCQUdrQjtBQUNoQixhQUFPLFdBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O0FBTUEseUJBQVlDLEtBQVosRUFBbUJDLE9BQW5CLEVBQTRCO0FBQUE7O0FBQzFCLFNBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQTs7O0FBR0EsU0FBS0MsTUFBTCxHQUFjLDZCQUFtQixLQUFLRixLQUF4QixFQUErQixLQUFLQyxPQUFwQyxDQUFkOztBQUVBOzs7QUFHQSxTQUFLRSxJQUFMLEdBQVksMkJBQWlCLEtBQUtILEtBQXRCLEVBQTZCLEtBQUtDLE9BQWxDLENBQVo7O0FBRUE7OztBQUdBLFNBQUtHLElBQUwsR0FBWSwyQkFBaUIsS0FBS0osS0FBdEIsRUFBNkIsS0FBS0MsT0FBbEMsQ0FBWjtBQUNEOztBQUVEOzs7Ozs7Ozs7OzJCQU1PSSxNLEVBQVFDLFEsRUFBVTtBQUN2QkQsZUFBU0UsS0FBS0MsU0FBTCxDQUFlSCxNQUFmLENBQVQ7O0FBRUEsVUFBSUksU0FBUztBQUNYQyxjQUFNLGVBREs7QUFFWEMsY0FBTVosY0FBY2EsSUFGVDtBQUdYQyxnQkFBUSxNQUhHO0FBSVhDLGNBQU1ULE1BSks7QUFLWFUsaUJBQVM7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUCw0QkFBa0JWLE9BQU9XLE1BRmxCO0FBR1AsdUNBQTJCLEtBQUtoQixLQUFMLENBQVdpQixXQUFYO0FBSHBCO0FBTEUsT0FBYjtBQVdBLFdBQUtoQixPQUFMLENBQWFpQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1YsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7O3dCQVFJYyxLLEVBQU9kLFEsRUFBVTtBQUNuQixVQUFHLENBQUNjLEtBQUosRUFBVztBQUNULGNBQU0sSUFBSUMsS0FBSixDQUFVLGlDQUFWLENBQU47QUFDRDs7QUFFRCxVQUFJQyxVQUFVLEVBQWQ7QUFDQSxVQUFHLE9BQU9GLEtBQVAsS0FBaUIsUUFBcEIsRUFBOEI7QUFDNUI7QUFDQUUsd0JBQWNGLEtBQWQ7QUFDRCxPQUhELE1BSUssSUFBRyxRQUFPQSxLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBQWpCLElBQTZCRyxPQUFPQyxJQUFQLENBQVlKLEtBQVosRUFBbUJKLE1BQW5CLEdBQTRCLENBQTVELEVBQStEO0FBQ2xFO0FBQ0FNLHdCQUFjLHNCQUFZZCxTQUFaLENBQXNCWSxLQUF0QixDQUFkO0FBQ0Q7O0FBRUQsVUFBSVgsU0FBUztBQUNYQyxjQUFLLGVBRE07QUFFWEMsbUJBQVFaLGNBQWNhLElBQXRCLEdBQTZCVSxPQUZsQjtBQUdYVCxnQkFBUSxLQUhHO0FBSVhFLGlCQUFTO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVAsdUNBQTJCLEtBQUtmLEtBQUwsQ0FBV2lCLFdBQVg7QUFGcEI7QUFKRSxPQUFiO0FBU0EsV0FBS2hCLE9BQUwsQ0FBYWlCLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDVixNQUFoQyxFQUF3Q0gsUUFBeEM7QUFDRDs7QUFFRDs7Ozs7Ozs7OzsyQkFPT21CLE0sRUFBUXBCLE0sRUFBUUMsUSxFQUFVO0FBQy9CRCxlQUFTRSxLQUFLQyxTQUFMLENBQWVILE1BQWYsQ0FBVDs7QUFFQSxVQUFJSSxTQUFTO0FBQ1hDLGNBQUssZUFETTtBQUVYQyxjQUFRWixjQUFjYSxJQUF0QixTQUE4QmEsTUFGbkI7QUFHWFosZ0JBQVEsS0FIRztBQUlYQyxjQUFNVCxNQUpLO0FBS1hVLGlCQUFTO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVAsNEJBQWtCVixPQUFPVyxNQUZsQjtBQUdQLHVDQUEyQixLQUFLaEIsS0FBTCxDQUFXaUIsV0FBWDtBQUhwQjtBQUxFLE9BQWI7QUFXQSxXQUFLaEIsT0FBTCxDQUFhaUIsVUFBYixDQUF3QkMsT0FBeEIsQ0FBZ0NWLE1BQWhDLEVBQXdDSCxRQUF4QztBQUNEOzs7Ozs7a0JBSVlQLGEiLCJmaWxlIjoiQ2FsbHNSZXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBxdWVyeXN0cmluZyBmcm9tICdxdWVyeXN0cmluZyc7XG5cbmltcG9ydCBTdHJlYW1SZXNvdXJjZSBmcm9tICcuL1N0cmVhbVJlc291cmNlJztcbmltcG9ydCBUYWxrUmVzb3VyY2UgZnJvbSAnLi9UYWxrUmVzb3VyY2UnO1xuaW1wb3J0IER0bWZSZXNvdXJjZSBmcm9tICcuL0R0bWZSZXNvdXJjZSc7XG5cbi8qKlxuICogUHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBgY2FsbHNgIHJlc291cmNlLlxuICovXG5jbGFzcyBDYWxsc1Jlc291cmNlIHtcbiAgXG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byB0aGUgYGNhbGxzYCByZXNvdXJjZS5cbiAgICovXG4gIHN0YXRpYyBnZXQgUEFUSCgpIHtcbiAgICByZXR1cm4gJy92MS9jYWxscyc7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IENhbGxzUmVzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRzIC0gQ3JlZGVudGlhbHMgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIE5leG1vIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIG9wdGlvbnMgZm9yIHRoZSBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNyZWRzLCBvcHRpb25zKSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgXG4gICAgLyoqXG4gICAgICogQHR5cGUgU3RyZWFtQ29udHJvbGxlclxuICAgICAqL1xuICAgIHRoaXMuc3RyZWFtID0gbmV3IFN0cmVhbVJlc291cmNlKHRoaXMuY3JlZHMsIHRoaXMub3B0aW9ucyk7XG4gICAgXG4gICAgLyoqXG4gICAgICogQHR5cGUgVGFsa1Jlc291cmNlXG4gICAgICovXG4gICAgdGhpcy50YWxrID0gbmV3IFRhbGtSZXNvdXJjZSh0aGlzLmNyZWRzLCB0aGlzLm9wdGlvbnMpO1xuICAgIFxuICAgIC8qKlxuICAgICAqIEB0eXBlIER0bWZSZXNvdXJjZVxuICAgICAqL1xuICAgIHRoaXMuZHRtZiA9IG5ldyBEdG1mUmVzb3VyY2UodGhpcy5jcmVkcywgdGhpcy5vcHRpb25zKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBjYWxsLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gUGFyYW1ldGVycyB1c2VkIHdoZW4gY3JlYXRpbmcgdGhlIGNhbGwuIFNlZSBodHRwczovL2RvY3MuZGV2Lm5leG1vaW5jLm5ldC92b2ljZS92b2ljZS1hcGkvYXBpLXJlZmVyZW5jZSNjYWxsX2NyZWF0ZSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBjcmVhdGUocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHBhcmFtcyA9IEpTT04uc3RyaW5naWZ5KHBhcmFtcyk7XG5cbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgaG9zdDogJ2FwaS5uZXhtby5jb20nLFxuICAgICAgcGF0aDogQ2FsbHNSZXNvdXJjZS5QQVRILFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdDb250ZW50LUxlbmd0aCc6IHBhcmFtcy5sZW5ndGgsXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3RoaXMuY3JlZHMuZ2VuZXJhdGVKd3QoKX1gXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG4gIFxuICAvKipcbiAgICogR2V0IGFuIGV4aXN0aW5nIGNhbGwuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcXVlcnkgLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBjYWxsIHRvIHJldHJpZXZlXG4gICAqICAgICAgICAgICAgICAgb3IgYSBzZXQgb2YgZmlsdGVyIHBhcmFtZXRlcnMgZm9yIHRoZSBxdWVyeS4gRm9yIG1vcmUgaW5mb3JtYXRpb25cbiAgICogICAgICAgICAgICAgICBzZWUgaHR0cHM6Ly9kb2NzLm5leG1vLmNvbS92b2ljZS92b2ljZS1hcGkvYXBpLXJlZmVyZW5jZSNjYWxsX3JldHJpZXZlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgY29tcGxldGVzLlxuICAgKi9cbiAgZ2V0KHF1ZXJ5LCBjYWxsYmFjaykge1xuICAgIGlmKCFxdWVyeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcInF1ZXJ5XCIgaXMgYSByZXF1aXJlZCBwYXJhbWV0ZXInKTtcbiAgICB9XG4gICAgXG4gICAgdmFyIHBhdGhFeHQgPSAnJztcbiAgICBpZih0eXBlb2YgcXVlcnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBzaW5nbGUgY2FsbCBJZFxuICAgICAgcGF0aEV4dCA9IGAvJHtxdWVyeX1gO1xuICAgIH1cbiAgICBlbHNlIGlmKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGZpbHRlclxuICAgICAgcGF0aEV4dCA9IGA/JHtxdWVyeXN0cmluZy5zdHJpbmdpZnkocXVlcnkpfWA7XG4gICAgfVxuICAgIFxuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OidhcGkubmV4bW8uY29tJyxcbiAgICAgIHBhdGg6YCR7Q2FsbHNSZXNvdXJjZS5QQVRIfSR7cGF0aEV4dH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjYWxsSWRdIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgY2FsbCB0byB1cGRhdGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBQYXJhbWV0ZXJzIHVzZWQgd2hlbiB1cGRhdGluZyB0aGUgY2FsbC4gU2VlIGh0dHBzOi8vZG9jcy5kZXYubmV4bW9pbmMubmV0L3ZvaWNlL3ZvaWNlLWFwaS9hcGktcmVmZXJlbmNlI2NhbGxfbW9kaWZ5X3NpbmdsZSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICB1cGRhdGUoY2FsbElkLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgcGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKTtcblxuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OidhcGkubmV4bW8uY29tJyxcbiAgICAgIHBhdGg6YCR7Q2FsbHNSZXNvdXJjZS5QQVRIfS8ke2NhbGxJZH1gLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogcGFyYW1zLmxlbmd0aCxcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dGhpcy5jcmVkcy5nZW5lcmF0ZUp3dCgpfWBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoY29uZmlnLCBjYWxsYmFjayk7XG4gIH1cbiAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbGxzUmVzb3VyY2U7XG4iXX0=