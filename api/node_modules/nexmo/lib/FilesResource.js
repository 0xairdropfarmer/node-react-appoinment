"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');

var FilesResource = function () {
  _createClass(FilesResource, null, [{
    key: 'PATH',


    /**
     * The path to the `calls` resource.
     */
    get: function get() {
      return '/v1/files';
    }

    /**
     * Creates a new FilesResource.
     *
     * @param {Credentials} creds - Credentials used when interacting with the Nexmo API.
     * @param {Object} options - additional options for the class.
     */

  }]);

  function FilesResource(creds, options) {
    _classCallCheck(this, FilesResource);

    this.creds = creds;
    this.options = options;
  }

  /**
   * Get stream for a remote File
   *
   * @param {string} [fileIdOrUrl] - The unique identifier or URL for the file
   * @param {function} callback - function to be called when the request completes.
   */


  _createClass(FilesResource, [{
    key: 'get',
    value: function get(fileIdOrUrl, callback) {

      if (!fileIdOrUrl) {
        throw new Error('"fileIdOrUrl" is a required parameter');
      }

      fileIdOrUrl = fileIdOrUrl.split("/").pop(-1);

      var config = {
        host: 'api.nexmo.com',
        path: FilesResource.PATH + '/' + fileIdOrUrl,
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Authorization': 'Bearer ' + this.creds.generateJwt()
        }
      };

      this.options.httpClient.request(config, callback);
    }

    /**
     * Save remote File locally
     *
     * @param {string} [fileIdOrUrl] - The unique identifier or URL for the file
     * @param {string} [file] - Filename or file descriptor
     * @param {function} callback - function to be called when the request completes.
     */

  }, {
    key: 'save',
    value: function save(fileIdOrUrl, file, callback) {
      var _this = this;

      this.get(fileIdOrUrl, function (error, data) {
        if (error) {
          callback(error, null);
        } else {
          _this.__storeFile(data, file, callback);
        }
      });
    }
  }, {
    key: '__storeFile',
    value: function __storeFile(data, file, callback) {
      fs.writeFile(file, data, function (error) {
        if (error) {
          callback(error, null);
        } else {
          callback(null, file);
        }
      });
    }
  }]);

  return FilesResource;
}();

exports.default = FilesResource;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9GaWxlc1Jlc291cmNlLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsIkZpbGVzUmVzb3VyY2UiLCJjcmVkcyIsIm9wdGlvbnMiLCJmaWxlSWRPclVybCIsImNhbGxiYWNrIiwiRXJyb3IiLCJzcGxpdCIsInBvcCIsImNvbmZpZyIsImhvc3QiLCJwYXRoIiwiUEFUSCIsIm1ldGhvZCIsImhlYWRlcnMiLCJnZW5lcmF0ZUp3dCIsImh0dHBDbGllbnQiLCJyZXF1ZXN0IiwiZmlsZSIsImdldCIsImVycm9yIiwiZGF0YSIsIl9fc3RvcmVGaWxlIiwid3JpdGVGaWxlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLEtBQUtDLFFBQVEsSUFBUixDQUFUOztJQUVNQyxhOzs7OztBQUVKOzs7d0JBR2tCO0FBQ2hCLGFBQU8sV0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7QUFNQSx5QkFBWUMsS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7QUFBQTs7QUFDMUIsU0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7d0JBTUlDLFcsRUFBYUMsUSxFQUFVOztBQUV6QixVQUFHLENBQUNELFdBQUosRUFBaUI7QUFDZixjQUFNLElBQUlFLEtBQUosQ0FBVSx1Q0FBVixDQUFOO0FBQ0Q7O0FBRURGLG9CQUFjQSxZQUFZRyxLQUFaLENBQWtCLEdBQWxCLEVBQXVCQyxHQUF2QixDQUEyQixDQUFDLENBQTVCLENBQWQ7O0FBRUEsVUFBSUMsU0FBUztBQUNYQyxjQUFLLGVBRE07QUFFWEMsY0FBUVYsY0FBY1csSUFBdEIsU0FBOEJSLFdBRm5CO0FBR1hTLGdCQUFRLEtBSEc7QUFJWEMsaUJBQVM7QUFDUCwwQkFBZ0IsMEJBRFQ7QUFFUCx1Q0FBMkIsS0FBS1osS0FBTCxDQUFXYSxXQUFYO0FBRnBCO0FBSkUsT0FBYjs7QUFVQSxXQUFLWixPQUFMLENBQWFhLFVBQWIsQ0FBd0JDLE9BQXhCLENBQWdDUixNQUFoQyxFQUF3Q0osUUFBeEM7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozt5QkFPS0QsVyxFQUFhYyxJLEVBQU1iLFEsRUFBVTtBQUFBOztBQUNoQyxXQUFLYyxHQUFMLENBQVNmLFdBQVQsRUFBc0IsVUFBQ2dCLEtBQUQsRUFBUUMsSUFBUixFQUFpQjtBQUNyQyxZQUFJRCxLQUFKLEVBQVc7QUFDVGYsbUJBQVNlLEtBQVQsRUFBZ0IsSUFBaEI7QUFDRCxTQUZELE1BRU87QUFDTCxnQkFBS0UsV0FBTCxDQUFpQkQsSUFBakIsRUFBdUJILElBQXZCLEVBQTZCYixRQUE3QjtBQUNEO0FBQ0YsT0FORDtBQU9EOzs7Z0NBRVdnQixJLEVBQU1ILEksRUFBTWIsUSxFQUFVO0FBQ2hDTixTQUFHd0IsU0FBSCxDQUFhTCxJQUFiLEVBQW1CRyxJQUFuQixFQUF5QixVQUFDRCxLQUFELEVBQVc7QUFDbEMsWUFBSUEsS0FBSixFQUFXO0FBQ1RmLG1CQUFTZSxLQUFULEVBQWdCLElBQWhCO0FBQ0QsU0FGRCxNQUVPO0FBQ0xmLG1CQUFTLElBQVQsRUFBZWEsSUFBZjtBQUNEO0FBQ0YsT0FORDtBQU9EOzs7Ozs7a0JBSVlqQixhIiwiZmlsZSI6IkZpbGVzUmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY2xhc3MgRmlsZXNSZXNvdXJjZSB7XG5cbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRvIHRoZSBgY2FsbHNgIHJlc291cmNlLlxuICAgKi9cbiAgc3RhdGljIGdldCBQQVRIKCkge1xuICAgIHJldHVybiAnL3YxL2ZpbGVzJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IEZpbGVzUmVzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRzIC0gQ3JlZGVudGlhbHMgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIE5leG1vIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIG9wdGlvbnMgZm9yIHRoZSBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNyZWRzLCBvcHRpb25zKSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHN0cmVhbSBmb3IgYSByZW1vdGUgRmlsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2ZpbGVJZE9yVXJsXSAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvciBVUkwgZm9yIHRoZSBmaWxlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgY29tcGxldGVzLlxuICAgKi9cbiAgZ2V0KGZpbGVJZE9yVXJsLCBjYWxsYmFjaykge1xuXG4gICAgaWYoIWZpbGVJZE9yVXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiZmlsZUlkT3JVcmxcIiBpcyBhIHJlcXVpcmVkIHBhcmFtZXRlcicpO1xuICAgIH1cblxuICAgIGZpbGVJZE9yVXJsID0gZmlsZUlkT3JVcmwuc3BsaXQoXCIvXCIpLnBvcCgtMSk7XG5cbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgaG9zdDonYXBpLm5leG1vLmNvbScsXG4gICAgICBwYXRoOmAke0ZpbGVzUmVzb3VyY2UuUEFUSH0vJHtmaWxlSWRPclVybH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0aGlzLmNyZWRzLmdlbmVyYXRlSnd0KCl9YFxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLm9wdGlvbnMuaHR0cENsaWVudC5yZXF1ZXN0KGNvbmZpZywgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgcmVtb3RlIEZpbGUgbG9jYWxseVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2ZpbGVJZE9yVXJsXSAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvciBVUkwgZm9yIHRoZSBmaWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZmlsZV0gLSBGaWxlbmFtZSBvciBmaWxlIGRlc2NyaXB0b3JcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMuXG4gICAqL1xuICBzYXZlKGZpbGVJZE9yVXJsLCBmaWxlLCBjYWxsYmFjaykge1xuICAgIHRoaXMuZ2V0KGZpbGVJZE9yVXJsLCAoZXJyb3IsIGRhdGEpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9fc3RvcmVGaWxlKGRhdGEsIGZpbGUsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgX19zdG9yZUZpbGUoZGF0YSwgZmlsZSwgY2FsbGJhY2spIHtcbiAgICBmcy53cml0ZUZpbGUoZmlsZSwgZGF0YSwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgZmlsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBGaWxlc1Jlc291cmNlO1xuIl19