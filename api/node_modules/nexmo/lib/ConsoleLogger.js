'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NullLogger2 = require('./NullLogger');

var _NullLogger3 = _interopRequireDefault(_NullLogger2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConsoleLogger = function (_NullLogger) {
  _inherits(ConsoleLogger, _NullLogger);

  function ConsoleLogger(consoleOverride) {
    _classCallCheck(this, ConsoleLogger);

    var _this = _possibleConstructorReturn(this, (ConsoleLogger.__proto__ || Object.getPrototypeOf(ConsoleLogger)).call(this));

    _this.out = consoleOverride || console;
    return _this;
  }

  _createClass(ConsoleLogger, [{
    key: 'log',
    value: function log(level) {
      var _out;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_out = this.out).log.apply(_out, [level + ':'].concat(args));
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
      var _out2;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      (_out2 = this.out).error.apply(_out2, ['error:'].concat(args));
    }
  }]);

  return ConsoleLogger;
}(_NullLogger3.default);

exports.default = ConsoleLogger;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25zb2xlTG9nZ2VyLmpzIl0sIm5hbWVzIjpbIkNvbnNvbGVMb2dnZXIiLCJjb25zb2xlT3ZlcnJpZGUiLCJvdXQiLCJjb25zb2xlIiwibGV2ZWwiLCJhcmdzIiwibG9nIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVNQSxhOzs7QUFDSix5QkFBWUMsZUFBWixFQUE2QjtBQUFBOztBQUFBOztBQUczQixVQUFLQyxHQUFMLEdBQVdELG1CQUFtQkUsT0FBOUI7QUFIMkI7QUFJNUI7Ozs7d0JBRUdDLEssRUFBZ0I7QUFBQTs7QUFBQSx3Q0FBTkMsSUFBTTtBQUFOQSxZQUFNO0FBQUE7O0FBQ2xCLG1CQUFLSCxHQUFMLEVBQVNJLEdBQVQsY0FBZ0JGLEtBQWhCLGVBQTZCQyxJQUE3QjtBQUNEOzs7MkJBRWE7QUFBQSx5Q0FBTkEsSUFBTTtBQUFOQSxZQUFNO0FBQUE7O0FBQ1osV0FBS0MsR0FBTCxjQUFTLE1BQVQsU0FBb0JELElBQXBCO0FBQ0Q7Ozs0QkFFYztBQUFBOztBQUFBLHlDQUFOQSxJQUFNO0FBQU5BLFlBQU07QUFBQTs7QUFDYixvQkFBS0gsR0FBTCxFQUFTSyxLQUFULGVBQWUsUUFBZixTQUE0QkYsSUFBNUI7QUFDRDs7Ozs7O2tCQUdZTCxhIiwiZmlsZSI6IkNvbnNvbGVMb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTnVsbExvZ2dlciBmcm9tICcuL051bGxMb2dnZXInO1xuXG5jbGFzcyBDb25zb2xlTG9nZ2VyIGV4dGVuZHMgTnVsbExvZ2dlciB7XG4gIGNvbnN0cnVjdG9yKGNvbnNvbGVPdmVycmlkZSkge1xuICAgIHN1cGVyKCk7XG4gICAgXG4gICAgdGhpcy5vdXQgPSBjb25zb2xlT3ZlcnJpZGUgfHwgY29uc29sZTtcbiAgfVxuICBcbiAgbG9nKGxldmVsLCAuLi5hcmdzKSB7XG4gICAgdGhpcy5vdXQubG9nKGAke2xldmVsfTpgLCAuLi5hcmdzKTtcbiAgfVxuXG4gIHdhcm4oLi4uYXJncykge1xuICAgIHRoaXMubG9nKCd3YXJuJywgLi4uYXJncyk7XG4gIH1cbiAgXG4gIGVycm9yKC4uLmFyZ3MpIHtcbiAgICB0aGlzLm91dC5lcnJvcignZXJyb3I6JywgLi4uYXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29uc29sZUxvZ2dlcjtcbiJdfQ==