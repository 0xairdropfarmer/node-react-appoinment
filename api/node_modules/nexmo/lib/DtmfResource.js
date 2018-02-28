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
 * Provides access to the `dtmf` resource.
 */
var DtmfResource = function () {
  _createClass(DtmfResource, null, [{
    key: 'PATH',


    /**
     * The path to the `dtmf` resource.
     */
    get: function get() {
      return '/v1/calls/{call_uuid}/dtmf';
    }

    /**
     * Creates a new DtmfResource.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function DtmfResource(creds, options) {
    _classCallCheck(this, DtmfResource);

    this.creds = creds;
    this.options = options;
  }

  /**
   * Sends DTMF to a call.
   *
   * @param {Object} params - Parameters used when sending the dtmf to the call. See https://docs.dev.nexmoinc.net/voice/voice-api/api-reference#dtmf_put for more information.
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(DtmfResource, [{
    key: 'send',
    value: function send(callId, params, callback) {
      params = JSON.stringify(params);

      var config = {
        host: 'api.nexmo.com',
        path: DtmfResource.PATH.replace('{call_uuid}', callId),
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

  return DtmfResource;
}();

exports.default = DtmfResource;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EdG1mUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiRHRtZlJlc291cmNlIiwiY3JlZHMiLCJvcHRpb25zIiwiY2FsbElkIiwicGFyYW1zIiwiY2FsbGJhY2siLCJKU09OIiwic3RyaW5naWZ5IiwiY29uZmlnIiwiaG9zdCIsInBhdGgiLCJQQVRIIiwicmVwbGFjZSIsIm1ldGhvZCIsImJvZHkiLCJoZWFkZXJzIiwibGVuZ3RoIiwiZ2VuZXJhdGVKd3QiLCJodHRwQ2xpZW50IiwicmVxdWVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLFk7Ozs7O0FBRUo7Ozt3QkFHa0I7QUFDaEIsYUFBTyw0QkFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7QUFNQSx3QkFBWUMsS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7QUFBQTs7QUFDMUIsU0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7eUJBTUtDLE0sRUFBUUMsTSxFQUFRQyxRLEVBQVU7QUFDN0JELGVBQVNFLEtBQUtDLFNBQUwsQ0FBZUgsTUFBZixDQUFUOztBQUVBLFVBQUlJLFNBQVM7QUFDWEMsY0FBTSxlQURLO0FBRVhDLGNBQU1WLGFBQWFXLElBQWIsQ0FBa0JDLE9BQWxCLENBQTBCLGFBQTFCLEVBQXlDVCxNQUF6QyxDQUZLO0FBR1hVLGdCQUFRLEtBSEc7QUFJWEMsY0FBTVYsTUFKSztBQUtYVyxpQkFBUztBQUNQLDBCQUFnQixrQkFEVDtBQUVQLDRCQUFrQlgsT0FBT1ksTUFGbEI7QUFHUCx1Q0FBMkIsS0FBS2YsS0FBTCxDQUFXZ0IsV0FBWDtBQUhwQjtBQUxFLE9BQWI7QUFXQSxXQUFLZixPQUFMLENBQWFnQixVQUFiLENBQXdCQyxPQUF4QixDQUFnQ1gsTUFBaEMsRUFBd0NILFFBQXhDO0FBQ0Q7Ozs7OztrQkFJWUwsWSIsImZpbGUiOiJEdG1mUmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcXVlcnlzdHJpbmcgZnJvbSAncXVlcnlzdHJpbmcnO1xuXG4vKipcbiAqIFByb3ZpZGVzIGFjY2VzcyB0byB0aGUgYGR0bWZgIHJlc291cmNlLlxuICovXG5jbGFzcyBEdG1mUmVzb3VyY2Uge1xuICBcbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRvIHRoZSBgZHRtZmAgcmVzb3VyY2UuXG4gICAqL1xuICBzdGF0aWMgZ2V0IFBBVEgoKSB7XG4gICAgcmV0dXJuICcvdjEvY2FsbHMve2NhbGxfdXVpZH0vZHRtZic7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IER0bWZSZXNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZHMgLSBDcmVkZW50aWFscyB1c2VkIHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCB0aGUgTmV4bW8gQVBJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgb3B0aW9ucyBmb3IgdGhlIGNsYXNzLlxuICAgKi9cbiAgY29uc3RydWN0b3IoY3JlZHMsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNyZWRzID0gY3JlZHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuICBcbiAgLyoqXG4gICAqIFNlbmRzIERUTUYgdG8gYSBjYWxsLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gUGFyYW1ldGVycyB1c2VkIHdoZW4gc2VuZGluZyB0aGUgZHRtZiB0byB0aGUgY2FsbC4gU2VlIGh0dHBzOi8vZG9jcy5kZXYubmV4bW9pbmMubmV0L3ZvaWNlL3ZvaWNlLWFwaS9hcGktcmVmZXJlbmNlI2R0bWZfcHV0IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSByZXF1ZXN0IGNvbXBsZXRlcy5cbiAgICovXG4gIHNlbmQoY2FsbElkLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgcGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKTtcblxuICAgIHZhciBjb25maWcgPSB7XG4gICAgICBob3N0OiAnYXBpLm5leG1vLmNvbScsXG4gICAgICBwYXRoOiBEdG1mUmVzb3VyY2UuUEFUSC5yZXBsYWNlKCd7Y2FsbF91dWlkfScsIGNhbGxJZCksXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1MZW5ndGgnOiBwYXJhbXMubGVuZ3RoLFxuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnQucmVxdWVzdChjb25maWcsIGNhbGxiYWNrKTtcbiAgfVxuICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgRHRtZlJlc291cmNlO1xuIl19