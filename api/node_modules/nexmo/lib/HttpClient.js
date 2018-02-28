'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var https = require('https');
var http = require('http');

var HttpClient = function () {
  function HttpClient(options) {
    _classCallCheck(this, HttpClient);

    this.port = 443 || options.port;
    this.https = options.https || https;
    this.http = options.http || http;
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };
    this.logger = options.logger;

    if (options.userAgent) {
      this.headers['User-Agent'] = options.userAgent;
    }
  }

  _createClass(HttpClient, [{
    key: 'request',
    value: function request(endpoint, method, callback) {
      var _this = this;

      if (typeof method == 'function') {
        callback = method;
        endpoint.method = endpoint.method || 'GET';
      } else if (typeof method !== 'undefined') {
        endpoint.method = method;
      }

      if (endpoint.method == 'POST' || endpoint.method == 'DELETE') {
        // TODO: verify the following fix is required
        // Fix broken due ot 411 Content-Length error now sent by Nexmo API
        // PL 2016-Sept-6 - commented out Content-Length 0
        // headers['Content-Length'] = 0;
      }
      var options = {
        host: endpoint.host ? endpoint.host : 'rest.nexmo.com',
        port: this.port,
        path: endpoint.path,
        method: endpoint.method,
        headers: this.headers
      };

      // Allow existing headers to be overridden
      // Allow new headers to be added
      if (endpoint.headers) {
        Object.keys(endpoint.headers).forEach(function (key) {
          options.headers[key] = endpoint.headers[key];
        });
      }

      this.logger.info('Request:', options, '\nBody:', endpoint.body);
      var request;

      if (options.port == 443) {
        request = this.https.request(options);
      } else {
        request = http.request(options);
      }

      request.end(endpoint.body);

      // Keep an array of String or Buffers,
      // depending on content type (binary or JSON) of response
      var responseData = [];

      request.on('response', function (response) {
        var isBinary = response.headers['content-type'] === 'application/octet-stream';
        if (!isBinary) {
          response.setEncoding('utf8');
        }

        response.on('data', function (chunk) {
          responseData.push(chunk);
        });

        response.on('end', function () {
          _this.logger.info('response ended:', response.statusCode);
          if (callback) {
            if (isBinary) {
              responseData = Buffer.concat(responseData);
            }

            _this.__parseResponse(response, responseData, endpoint.method, callback);
          }
        });
        response.on('close', function (e) {
          _this.logger.error('problem with API request detailed stacktrace below ');
          _this.logger.error(e);
          callback(e);
        });
      });
      request.on('error', function (e) {
        _this.logger.error('problem with API request detailed stacktrace below ');
        _this.logger.error(e);
        callback(e);
      });
    }
  }, {
    key: '__parseResponse',
    value: function __parseResponse(httpResponse, data, method, callback) {
      var isArrayOrBuffer = data instanceof Array || data instanceof Buffer;
      if (!isArrayOrBuffer) {
        throw new Error('data should be of type Array or Buffer');
      }

      var status = httpResponse.statusCode;
      var headers = httpResponse.headers;

      var response = null;
      var error = null;

      try {
        if (status >= 500) {
          error = { message: 'Server Error', statusCode: status };
        } else if (httpResponse.headers['content-type'] === 'application/octet-stream') {
          response = data;
        } else if (status === 429) {
          // 429 does not return a parsable body
          if (!headers['retry-after']) {
            // retry based on allowed per second
            var retryAfterMillis = method === 'POST' ? 1000 / 2 : 1000 / 5;
            headers['retry-after'] = retryAfterMillis;
          }
          error = { body: data.join('') };
        } else if (status >= 400 || status < 200) {
          error = { body: JSON.parse(data.join('')), headers: headers };
        } else if (method !== 'DELETE') {
          response = JSON.parse(data.join(''));
        } else {
          response = data;
        }
      } catch (parseError) {
        this.logger.error(parseError);
        this.logger.error('could not convert API response to JSON, above error is ignored and raw API response is returned to client');
        this.logger.error('Raw Error message from API ');
        this.logger.error('"' + data + '"');

        error = {
          message: "The API response could not be parsed.",
          body: data.join(''),
          parseError: parseError
        };
      }

      if (error) {
        error.statusCode = status;
        error.headers = headers;
      }

      callback(error, response);
    }
  }]);

  return HttpClient;
}();

exports.default = HttpClient;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IdHRwQ2xpZW50LmpzIl0sIm5hbWVzIjpbImh0dHBzIiwicmVxdWlyZSIsImh0dHAiLCJIdHRwQ2xpZW50Iiwib3B0aW9ucyIsInBvcnQiLCJoZWFkZXJzIiwibG9nZ2VyIiwidXNlckFnZW50IiwiZW5kcG9pbnQiLCJtZXRob2QiLCJjYWxsYmFjayIsImhvc3QiLCJwYXRoIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJpbmZvIiwiYm9keSIsInJlcXVlc3QiLCJlbmQiLCJyZXNwb25zZURhdGEiLCJvbiIsInJlc3BvbnNlIiwiaXNCaW5hcnkiLCJzZXRFbmNvZGluZyIsImNodW5rIiwicHVzaCIsInN0YXR1c0NvZGUiLCJCdWZmZXIiLCJjb25jYXQiLCJfX3BhcnNlUmVzcG9uc2UiLCJlIiwiZXJyb3IiLCJodHRwUmVzcG9uc2UiLCJkYXRhIiwiaXNBcnJheU9yQnVmZmVyIiwiQXJyYXkiLCJFcnJvciIsInN0YXR1cyIsIm1lc3NhZ2UiLCJyZXRyeUFmdGVyTWlsbGlzIiwiam9pbiIsIkpTT04iLCJwYXJzZSIsInBhcnNlRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxRQUFRQyxRQUFRLE9BQVIsQ0FBWjtBQUNBLElBQUlDLE9BQU9ELFFBQVEsTUFBUixDQUFYOztJQUVNRSxVO0FBQ0osc0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsU0FBS0MsSUFBTCxHQUFZLE9BQU9ELFFBQVFDLElBQTNCO0FBQ0EsU0FBS0wsS0FBTCxHQUFhSSxRQUFRSixLQUFSLElBQWlCQSxLQUE5QjtBQUNBLFNBQUtFLElBQUwsR0FBYUUsUUFBUUYsSUFBUixJQUFnQkEsSUFBN0I7QUFDQSxTQUFLSSxPQUFMLEdBQWU7QUFDWCxzQkFBZ0IsbUNBREw7QUFFWCxnQkFBVTtBQUZDLEtBQWY7QUFJQSxTQUFLQyxNQUFMLEdBQWNILFFBQVFHLE1BQXRCOztBQUVBLFFBQUdILFFBQVFJLFNBQVgsRUFBc0I7QUFDcEIsV0FB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QW1DO0FBQ3hDTixrQkFBUSxFQUFDZixNQUFNeUIsS0FBS0MsS0FBTCxDQUFXVCxLQUFLTyxJQUFMLENBQVUsRUFBVixDQUFYLENBQVAsRUFBa0NyQyxnQkFBbEMsRUFBUjtBQUNELFNBRk0sTUFFQSxJQUFHSSxXQUFXLFFBQWQsRUFBd0I7QUFDN0JjLHFCQUFXb0IsS0FBS0MsS0FBTCxDQUFXVCxLQUFLTyxJQUFMLENBQVUsRUFBVixDQUFYLENBQVg7QUFDRCxTQUZNLE1BRUE7QUFDTG5CLHFCQUFXWSxJQUFYO0FBQ0Q7QUFDRixPQXBCRCxDQW9CRSxPQUFPVSxVQUFQLEVBQW1CO0FBQ25CLGFBQUt2QyxNQUFMLENBQVkyQixLQUFaLENBQWtCWSxVQUFsQjtBQUNBLGFBQUt2QyxNQUFMLENBQVkyQixLQUFaLENBQWtCLDJHQUFsQjtBQUNBLGFBQUszQixNQUFMLENBQVkyQixLQUFaLENBQWtCLDZCQUFsQjtBQUNBLGFBQUszQixNQUFMLENBQVkyQixLQUFaLE9BQXNCRSxJQUF0Qjs7QUFFQUYsZ0JBQVE7QUFDTk8sbUJBQVMsdUNBREg7QUFFTnRCLGdCQUFNaUIsS0FBS08sSUFBTCxDQUFVLEVBQVYsQ0FGQTtBQUdORyxzQkFBWUE7QUFITixTQUFSO0FBS0Q7O0FBRUQsVUFBR1osS0FBSCxFQUFVO0FBQ1JBLGNBQU1MLFVBQU4sR0FBbUJXLE1BQW5CO0FBQ0FOLGNBQU01QixPQUFOLEdBQWdCQSxPQUFoQjtBQUNEOztBQUVESyxlQUFTdUIsS0FBVCxFQUFnQlYsUUFBaEI7QUFDRDs7Ozs7O2tCQUdZckIsVSIsImZpbGUiOiJIdHRwQ2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGh0dHBzID0gcmVxdWlyZSgnaHR0cHMnKTtcbnZhciBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuXG5jbGFzcyBIdHRwQ2xpZW50IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMucG9ydCA9IDQ0MyB8fCBvcHRpb25zLnBvcnQ7XG4gICAgdGhpcy5odHRwcyA9IG9wdGlvbnMuaHR0cHMgfHwgaHR0cHM7XG4gICAgdGhpcy5odHRwID0gIG9wdGlvbnMuaHR0cCB8fCBodHRwO1xuICAgIHRoaXMuaGVhZGVycyA9IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyO1xuXG4gICAgaWYob3B0aW9ucy51c2VyQWdlbnQpIHtcbiAgICAgIHRoaXMuaGVhZGVyc1snVXNlci1BZ2VudCddID0gb3B0aW9ucy51c2VyQWdlbnQ7XG4gICAgfVxuICB9XG5cbiAgcmVxdWVzdChlbmRwb2ludCwgbWV0aG9kLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgbWV0aG9kID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBtZXRob2Q7XG4gICAgICAgIGVuZHBvaW50Lm1ldGhvZCA9IGVuZHBvaW50Lm1ldGhvZCB8fCAnR0VUJztcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIFx0ZW5kcG9pbnQubWV0aG9kID0gbWV0aG9kO1xuICAgIH1cblxuICAgIGlmIChlbmRwb2ludC5tZXRob2QgPT0gJ1BPU1QnIHx8IGVuZHBvaW50Lm1ldGhvZCA9PSAnREVMRVRFJykge1xuICAgICAgICAvLyBUT0RPOiB2ZXJpZnkgdGhlIGZvbGxvd2luZyBmaXggaXMgcmVxdWlyZWRcbiAgICAgICAgLy8gRml4IGJyb2tlbiBkdWUgb3QgNDExIENvbnRlbnQtTGVuZ3RoIGVycm9yIG5vdyBzZW50IGJ5IE5leG1vIEFQSVxuICAgICAgICAvLyBQTCAyMDE2LVNlcHQtNiAtIGNvbW1lbnRlZCBvdXQgQ29udGVudC1MZW5ndGggMFxuICAgICAgICAvLyBoZWFkZXJzWydDb250ZW50LUxlbmd0aCddID0gMDtcbiAgICB9XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIGhvc3Q6IGVuZHBvaW50Lmhvc3Q/ZW5kcG9pbnQuaG9zdDoncmVzdC5uZXhtby5jb20nLFxuICAgICAgICBwb3J0OiB0aGlzLnBvcnQsXG4gICAgICAgIHBhdGg6IGVuZHBvaW50LnBhdGgsXG4gICAgICAgIG1ldGhvZDogZW5kcG9pbnQubWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnNcbiAgICB9O1xuXG4gICAgLy8gQWxsb3cgZXhpc3RpbmcgaGVhZGVycyB0byBiZSBvdmVycmlkZGVuXG4gICAgLy8gQWxsb3cgbmV3IGhlYWRlcnMgdG8gYmUgYWRkZWRcbiAgICBpZihlbmRwb2ludC5oZWFkZXJzKSB7XG4gICAgICBPYmplY3Qua2V5cyhlbmRwb2ludC5oZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBvcHRpb25zLmhlYWRlcnNba2V5XSA9IGVuZHBvaW50LmhlYWRlcnNba2V5XTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmluZm8oJ1JlcXVlc3Q6Jywgb3B0aW9ucywgJ1xcbkJvZHk6JywgZW5kcG9pbnQuYm9keSk7XG4gICAgdmFyIHJlcXVlc3Q7XG5cbiAgICBpZiAob3B0aW9ucy5wb3J0ID09IDQ0Mykge1xuICAgICAgICByZXF1ZXN0ID0gdGhpcy5odHRwcy5yZXF1ZXN0KG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVlc3QgPSBodHRwLnJlcXVlc3Qob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5lbmQoZW5kcG9pbnQuYm9keSk7XG5cbiAgICAvLyBLZWVwIGFuIGFycmF5IG9mIFN0cmluZyBvciBCdWZmZXJzLFxuICAgIC8vIGRlcGVuZGluZyBvbiBjb250ZW50IHR5cGUgKGJpbmFyeSBvciBKU09OKSBvZiByZXNwb25zZVxuICAgIHZhciByZXNwb25zZURhdGEgPSBbXTtcblxuICAgIHJlcXVlc3Qub24oJ3Jlc3BvbnNlJywgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHZhciBpc0JpbmFyeSA9IHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID09PSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcbiAgICAgICAgaWYgKCFpc0JpbmFyeSkgeyByZXNwb25zZS5zZXRFbmNvZGluZygndXRmOCcpOyB9XG5cbiAgICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCAoY2h1bmspID0+IHtcbiAgICAgICAgICByZXNwb25zZURhdGEucHVzaChjaHVuayk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdyZXNwb25zZSBlbmRlZDonLCByZXNwb25zZS5zdGF0dXNDb2RlKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICBpZiAoaXNCaW5hcnkpIHsgcmVzcG9uc2VEYXRhID0gQnVmZmVyLmNvbmNhdChyZXNwb25zZURhdGEpOyB9XG5cbiAgICAgICAgICAgICAgdGhpcy5fX3BhcnNlUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VEYXRhLFxuICAgICAgICAgICAgICAgIGVuZHBvaW50Lm1ldGhvZCxcbiAgICAgICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXNwb25zZS5vbignY2xvc2UnLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoJ3Byb2JsZW0gd2l0aCBBUEkgcmVxdWVzdCBkZXRhaWxlZCBzdGFja3RyYWNlIGJlbG93ICcpO1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5vbignZXJyb3InLCAoZSkgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcigncHJvYmxlbSB3aXRoIEFQSSByZXF1ZXN0IGRldGFpbGVkIHN0YWNrdHJhY2UgYmVsb3cgJyk7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGUpO1xuICAgICAgICBjYWxsYmFjayhlKTtcbiAgICB9KTtcblxuICB9XG5cbiAgX19wYXJzZVJlc3BvbnNlKGh0dHBSZXNwb25zZSwgZGF0YSwgbWV0aG9kLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGlzQXJyYXlPckJ1ZmZlciA9IChkYXRhIGluc3RhbmNlb2YgQXJyYXkgfHwgZGF0YSBpbnN0YW5jZW9mIEJ1ZmZlcik7XG4gICAgaWYoIWlzQXJyYXlPckJ1ZmZlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRhIHNob3VsZCBiZSBvZiB0eXBlIEFycmF5IG9yIEJ1ZmZlcicpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXR1cyA9IGh0dHBSZXNwb25zZS5zdGF0dXNDb2RlO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBodHRwUmVzcG9uc2UuaGVhZGVycztcblxuICAgIGxldCByZXNwb25zZSA9IG51bGw7XG4gICAgdmFyIGVycm9yID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoc3RhdHVzID49IDUwMCkge1xuICAgICAgICBlcnJvciA9IHsgbWVzc2FnZTogJ1NlcnZlciBFcnJvcicsIHN0YXR1c0NvZGU6IHN0YXR1cyB9O1xuICAgICAgfSBlbHNlIGlmIChodHRwUmVzcG9uc2UuaGVhZGVyc1snY29udGVudC10eXBlJ10gPT09ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSB7XG4gICAgICAgIHJlc3BvbnNlID0gZGF0YTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSA0MjkpIHtcbiAgICAgICAgLy8gNDI5IGRvZXMgbm90IHJldHVybiBhIHBhcnNhYmxlIGJvZHlcbiAgICAgICAgaWYoIWhlYWRlcnNbJ3JldHJ5LWFmdGVyJ10pIHtcbiAgICAgICAgICAvLyByZXRyeSBiYXNlZCBvbiBhbGxvd2VkIHBlciBzZWNvbmRcbiAgICAgICAgICBjb25zdCByZXRyeUFmdGVyTWlsbGlzID0gKG1ldGhvZCA9PT0gJ1BPU1QnPyAxMDAwLzIgOiAxMDAwLzUpO1xuICAgICAgICAgIGhlYWRlcnNbJ3JldHJ5LWFmdGVyJ10gPSByZXRyeUFmdGVyTWlsbGlzO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yID0ge2JvZHk6IGRhdGEuam9pbignJyl9O1xuICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPj0gNDAwIHx8IHN0YXR1cyA8IDIwMCkge1xuICAgICAgICBlcnJvciA9IHtib2R5OiBKU09OLnBhcnNlKGRhdGEuam9pbignJykpLCBoZWFkZXJzfTtcbiAgICAgIH0gZWxzZSBpZihtZXRob2QgIT09ICdERUxFVEUnKSB7XG4gICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShkYXRhLmpvaW4oJycpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3BvbnNlID0gZGF0YTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChwYXJzZUVycm9yKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcihwYXJzZUVycm9yKTtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdjb3VsZCBub3QgY29udmVydCBBUEkgcmVzcG9uc2UgdG8gSlNPTiwgYWJvdmUgZXJyb3IgaXMgaWdub3JlZCBhbmQgcmF3IEFQSSByZXNwb25zZSBpcyByZXR1cm5lZCB0byBjbGllbnQnKTtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdSYXcgRXJyb3IgbWVzc2FnZSBmcm9tIEFQSSAnKTtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGBcIiR7ZGF0YX1cImApO1xuXG4gICAgICBlcnJvciA9IHtcbiAgICAgICAgbWVzc2FnZTogXCJUaGUgQVBJIHJlc3BvbnNlIGNvdWxkIG5vdCBiZSBwYXJzZWQuXCIsXG4gICAgICAgIGJvZHk6IGRhdGEuam9pbignJyksXG4gICAgICAgIHBhcnNlRXJyb3I6IHBhcnNlRXJyb3JcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYoZXJyb3IpIHtcbiAgICAgIGVycm9yLnN0YXR1c0NvZGUgPSBzdGF0dXM7XG4gICAgICBlcnJvci5oZWFkZXJzID0gaGVhZGVycztcbiAgICB9XG5cbiAgICBjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBDbGllbnQ7XG4iXX0=