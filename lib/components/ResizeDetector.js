'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _resizeDetectorStyles = require('../helpers/resizeDetectorStyles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResizeDetector = function (_Component) {
  _inherits(ResizeDetector, _Component);

  function ResizeDetector() {
    _classCallCheck(this, ResizeDetector);

    var _this = _possibleConstructorReturn(this, (ResizeDetector.__proto__ || Object.getPrototypeOf(ResizeDetector)).call(this));

    _this.state = {
      expandChildHeight: 0,
      expandChildWidth: 0,
      expandScrollLeft: 0,
      expandScrollTop: 0,
      shrinkScrollTop: 0,
      shrinkScrollLeft: 0,
      lastWidth: 0,
      lastHeight: 0
    };

    _this.reset = _this.reset.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    return _this;
  }

  _createClass(ResizeDetector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.forceUpdate();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _containerSize = this.containerSize(),
          _containerSize2 = _slicedToArray(_containerSize, 2),
          width = _containerSize2[0],
          height = _containerSize2[1];

      this.reset(width, height);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props !== nextProps;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.expand.scrollLeft = this.expand.scrollWidth;
      this.expand.scrollTop = this.expand.scrollHeight;

      this.shrink.scrollLeft = this.shrink.scrollWidth;
      this.shrink.scrollTop = this.shrink.scrollHeight;
    }
  }, {
    key: 'containerSize',
    value: function containerSize() {
      return [this.props.handleWidth && this.container.parentElement.offsetWidth, this.props.handleHeight && this.container.parentElement.offsetHeight];
    }
  }, {
    key: 'reset',
    value: function reset(containerWidth, containerHeight) {
      if (typeof window === 'undefined') {
        return;
      }

      var parent = this.container.parentElement;

      var position = 'static';
      if (parent.currentStyle) {
        position = parent.currentStyle.position;
      } else if (window.getComputedStyle) {
        position = window.getComputedStyle(parent).position;
      }
      if (position === 'static') {
        parent.style.position = 'relative';
      }

      this.setState({
        expandChildHeight: this.expand.offsetHeight + 10,
        expandChildWidth: this.expand.offsetWidth + 10,
        lastWidth: containerWidth,
        lastHeight: containerHeight
      });
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      if (typeof window === 'undefined') {
        return;
      }

      var state = this.state;

      var _containerSize3 = this.containerSize(),
          _containerSize4 = _slicedToArray(_containerSize3, 2),
          width = _containerSize4[0],
          height = _containerSize4[1];

      if (width !== state.lastWidth || height !== state.lastHeight) {
        this.props.onResize(width, height);
      }

      this.reset(width, height);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var state = this.state;


      var expandStyle = _extends({}, _resizeDetectorStyles.expandChildStyle, {
        width: state.expandChildWidth,
        height: state.expandChildHeight
      });

      return _react2.default.createElement(
        'div',
        { style: _resizeDetectorStyles.parentStyle, ref: function ref(e) {
            _this2.container = e;
          } },
        _react2.default.createElement(
          'div',
          { style: _resizeDetectorStyles.parentStyle, onScroll: this.handleScroll, ref: function ref(e) {
              _this2.expand = e;
            } },
          _react2.default.createElement('div', { style: expandStyle })
        ),
        _react2.default.createElement(
          'div',
          { style: _resizeDetectorStyles.parentStyle, onScroll: this.handleScroll, ref: function ref(e) {
              _this2.shrink = e;
            } },
          _react2.default.createElement('div', { style: _resizeDetectorStyles.shrinkChildStyle })
        )
      );
    }
  }]);

  return ResizeDetector;
}(_react.Component);

exports.default = ResizeDetector;


ResizeDetector.propTypes = {
  handleWidth: _react.PropTypes.bool,
  handleHeight: _react.PropTypes.bool,
  onResize: _react.PropTypes.func
};

ResizeDetector.defaultProps = {
  handleWidth: false,
  handleHeight: false,
  onResize: function onResize(e) {
    return e;
  }
};