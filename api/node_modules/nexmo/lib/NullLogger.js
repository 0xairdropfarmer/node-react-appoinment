'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NullLogger = function () {
  function NullLogger() {
    _classCallCheck(this, NullLogger);
  }

  _createClass(NullLogger, [{
    key: 'log',
    value: function log(level) {}
  }, {
    key: 'info',
    value: function info() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.log.apply(this, ['info'].concat(args));
    }
  }, {
    key: 'warn',
    value: function warn() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.log.apply(this, ['warn'].concat(args));
    }
  }, {
    key: 'error',
    value: function error() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.log.apply(this, ['error'].concat(args));
    }
  }]);

  return NullLogger;
}();

module.exports = NullLogger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9OdWxsTG9nZ2VyLmpzIl0sIm5hbWVzIjpbIk51bGxMb2dnZXIiLCJsZXZlbCIsImFyZ3MiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBTUEsVTs7Ozs7Ozt3QkFDQUMsSyxFQUFnQixDQUNuQjs7OzJCQUVhO0FBQUEsd0NBQU5DLElBQU07QUFBTkEsWUFBTTtBQUFBOztBQUNaLFdBQUtDLEdBQUwsY0FBUyxNQUFULFNBQW9CRCxJQUFwQjtBQUNEOzs7MkJBRWE7QUFBQSx5Q0FBTkEsSUFBTTtBQUFOQSxZQUFNO0FBQUE7O0FBQ1osV0FBS0MsR0FBTCxjQUFTLE1BQVQsU0FBb0JELElBQXBCO0FBQ0Q7Ozs0QkFFYztBQUFBLHlDQUFOQSxJQUFNO0FBQU5BLFlBQU07QUFBQTs7QUFDYixXQUFLQyxHQUFMLGNBQVMsT0FBVCxTQUFxQkQsSUFBckI7QUFDRDs7Ozs7O0FBR0hFLE9BQU9DLE9BQVAsR0FBaUJMLFVBQWpCIiwiZmlsZSI6Ik51bGxMb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBOdWxsTG9nZ2VyIHtcbiAgbG9nKGxldmVsLCAuLi5hcmdzKSB7XG4gIH1cbiAgXG4gIGluZm8oLi4uYXJncykge1xuICAgIHRoaXMubG9nKCdpbmZvJywgLi4uYXJncyk7XG4gIH1cbiAgXG4gIHdhcm4oLi4uYXJncykge1xuICAgIHRoaXMubG9nKCd3YXJuJywgLi4uYXJncyk7XG4gIH1cbiAgXG4gIGVycm9yKC4uLmFyZ3MpIHtcbiAgICB0aGlzLmxvZygnZXJyb3InLCAuLi5hcmdzKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE51bGxMb2dnZXI7XG4iXX0=