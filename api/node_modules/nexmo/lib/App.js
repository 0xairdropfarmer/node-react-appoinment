"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {

  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition App options.
   */
  function App(credentials) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, App);

    this.creds = credentials;
    this.options = options;

    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || _index2.default;

    this._nexmo.initialize(this.creds.apiKey, this.creds.apiSecret, this.options);
  }

  /**
   * TODO: document
   */


  _createClass(App, [{
    key: 'create',
    value: function create() {
      this._nexmo.createApplication.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: 'get',
    value: function get(appId) {
      if ((typeof appId === 'undefined' ? 'undefined' : _typeof(appId)) !== 'object') {
        this._nexmo.getApplication.apply(this._nexmo, arguments);
      } else {
        this._nexmo.getApplications.apply(this._nexmo, arguments);
      }
    }

    /**
     * TODO: document
     */

  }, {
    key: 'update',
    value: function update() {
      this._nexmo.updateApplication.apply(this._nexmo, arguments);
    }

    /**
     * TODO: document
     */

  }, {
    key: 'delete',
    value: function _delete() {
      this._nexmo.deleteApplication.apply(this._nexmo, arguments);
    }
  }]);

  return App;
}();

exports.default = App;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHAuanMiXSwibmFtZXMiOlsiQXBwIiwiY3JlZGVudGlhbHMiLCJvcHRpb25zIiwiY3JlZHMiLCJfbmV4bW8iLCJuZXhtb092ZXJyaWRlIiwiaW5pdGlhbGl6ZSIsImFwaUtleSIsImFwaVNlY3JldCIsImNyZWF0ZUFwcGxpY2F0aW9uIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJhcHBJZCIsImdldEFwcGxpY2F0aW9uIiwiZ2V0QXBwbGljYXRpb25zIiwidXBkYXRlQXBwbGljYXRpb24iLCJkZWxldGVBcHBsaWNhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFTUEsRzs7QUFFSjs7Ozs7O0FBTUEsZUFBWUMsV0FBWixFQUF1QztBQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFBQTs7QUFDckMsU0FBS0MsS0FBTCxHQUFhRixXQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmOztBQUVBO0FBQ0EsU0FBS0UsTUFBTCxHQUFjLEtBQUtGLE9BQUwsQ0FBYUcsYUFBYixtQkFBZDs7QUFFQSxTQUFLRCxNQUFMLENBQVlFLFVBQVosQ0FBdUIsS0FBS0gsS0FBTCxDQUFXSSxNQUFsQyxFQUEwQyxLQUFLSixLQUFMLENBQVdLLFNBQXJELEVBQWdFLEtBQUtOLE9BQXJFO0FBQ0Q7O0FBRUQ7Ozs7Ozs7NkJBR1M7QUFDUCxXQUFLRSxNQUFMLENBQVlLLGlCQUFaLENBQThCQyxLQUE5QixDQUFvQyxLQUFLTixNQUF6QyxFQUFpRE8sU0FBakQ7QUFDRDs7QUFFRDs7Ozs7O3dCQUdJQyxLLEVBQU87QUFDVCxVQUFHLFFBQU9BLEtBQVAseUNBQU9BLEtBQVAsT0FBa0IsUUFBckIsRUFBK0I7QUFDN0IsYUFBS1IsTUFBTCxDQUFZUyxjQUFaLENBQTJCSCxLQUEzQixDQUFpQyxLQUFLTixNQUF0QyxFQUE4Q08sU0FBOUM7QUFDRCxPQUZELE1BR0s7QUFDSCxhQUFLUCxNQUFMLENBQVlVLGVBQVosQ0FBNEJKLEtBQTVCLENBQWtDLEtBQUtOLE1BQXZDLEVBQStDTyxTQUEvQztBQUNEO0FBQ0Y7O0FBRUQ7Ozs7Ozs2QkFHUztBQUNQLFdBQUtQLE1BQUwsQ0FBWVcsaUJBQVosQ0FBOEJMLEtBQTlCLENBQW9DLEtBQUtOLE1BQXpDLEVBQWlETyxTQUFqRDtBQUNEOztBQUVEOzs7Ozs7OEJBR1M7QUFDUCxXQUFLUCxNQUFMLENBQVlZLGlCQUFaLENBQThCTixLQUE5QixDQUFvQyxLQUFLTixNQUF6QyxFQUFpRE8sU0FBakQ7QUFDRDs7Ozs7O2tCQUlZWCxHIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgbmV4bW8gZnJvbSAnLi9pbmRleCc7XG5cbmNsYXNzIEFwcCB7XG4gIFxuICAvKipcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogICAgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCB3aGVuIGludGVyYWN0aW5nIHdpdGggdGhlIEFQSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogICAgQWRkaXRpb24gQXBwIG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjcmVkZW50aWFscywgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRlbnRpYWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgXG4gICAgLy8gVXNlZCB0byBmYWNpbGl0YXRlIHRlc3Rpbmcgb2YgdGhlIGNhbGwgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0XG4gICAgdGhpcy5fbmV4bW8gPSB0aGlzLm9wdGlvbnMubmV4bW9PdmVycmlkZSB8fCBuZXhtbztcbiAgICBcbiAgICB0aGlzLl9uZXhtby5pbml0aWFsaXplKHRoaXMuY3JlZHMuYXBpS2V5LCB0aGlzLmNyZWRzLmFwaVNlY3JldCwgdGhpcy5vcHRpb25zKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqLyBcbiAgY3JlYXRlKCkge1xuICAgIHRoaXMuX25leG1vLmNyZWF0ZUFwcGxpY2F0aW9uLmFwcGx5KHRoaXMuX25leG1vLCBhcmd1bWVudHMpO1xuICB9XG4gIFxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIGdldChhcHBJZCkge1xuICAgIGlmKHR5cGVvZihhcHBJZCkgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLl9uZXhtby5nZXRBcHBsaWNhdGlvbi5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9uZXhtby5nZXRBcHBsaWNhdGlvbnMuYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogVE9ETzogZG9jdW1lbnRcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLl9uZXhtby51cGRhdGVBcHBsaWNhdGlvbi5hcHBseSh0aGlzLl9uZXhtbywgYXJndW1lbnRzKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRPRE86IGRvY3VtZW50XG4gICAqL1xuICBkZWxldGUoKSB7XG4gICAgdGhpcy5fbmV4bW8uZGVsZXRlQXBwbGljYXRpb24uYXBwbHkodGhpcy5fbmV4bW8sIGFyZ3VtZW50cyk7XG4gIH1cbiAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiJdfQ==