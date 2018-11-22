'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var reactRedux = require('react-redux');
var redux = require('redux');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var cache = {
  data: {},
  set: function set(cacheName, _ref) {
    var name = _ref.name,
        data = _ref.data;
    this.data[cacheName] = {
      name: name,
      data: data
    };
  },
  get: function get(name) {
    return this.data[name];
  },
  getData: function getData(name) {
    return this.data[name].data;
  },
  getQueryName: function getQueryName(name) {
    return this.data[name].name;
  },
  clear: function clear() {
    this.data = {};
  },
  exist: function exist(name) {
    return !!this.data[name];
  },
  clearByName: function clearByName(name) {
    var _arr = Object.keys(this.data);

    for (var _i = 0; _i < _arr.length; _i++) {
      var key = _arr[_i];

      if (this.getQueryName(key) == name) {
        delete this.data[key];
      }
    }
  }
};

function getCacheName(name, data) {
  var list = [];

  var _arr = Object.entries(data);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        key = _arr$_i[0],
        value = _arr$_i[1];

    list.push({
      key: key,
      value: value
    });
  }

  var newList = list.sort(function (a, b) {
    var nameA = a.key.toUpperCase(); // ignore upper and lowercase

    var nameB = b.key.toUpperCase(); // ignore upper and lowercase

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = newList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      name = "".concat(name, "&").concat(item.key, "=").concat(item.value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return name;
}
function getVariablesData(variables, props) {
  if (typeof variables === 'function') {
    return variables(props);
  } else {
    return variables;
  }
}

function getQueryComponent(_ref) {
  var _query = _ref.query,
      WrappedComponent = _ref.WrappedComponent,
      renderFun = _ref.renderFun,
      name = _ref.name,
      _ref$variables = _ref.variables,
      variables = _ref$variables === void 0 ? {} : _ref$variables,
      _ref$forcedUpdate = _ref.forcedUpdate,
      forcedUpdate = _ref$forcedUpdate === void 0 ? false : _ref$forcedUpdate,
      _ref$awaitQuery = _ref.awaitQuery,
      awaitQuery = _ref$awaitQuery === void 0 ? false : _ref$awaitQuery,
      updateQuery = _ref.updateQuery;

  var QueryComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(QueryComponent, _React$Component);

    function QueryComponent(props) {
      var _this;

      _classCallCheck(this, QueryComponent);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(QueryComponent).call(this, props));
      _this.awaitQuery = awaitQuery;

      _this.query(props, variables, forcedUpdate, updateQuery);

      return _this;
    }

    _createClass(QueryComponent, [{
      key: "query",
      value: function query(props, variables, forcedUpdate, updateQuery) {
        var store = props.store,
            setStore = props.setStore,
            queryName = props.queryName,
            other = _objectWithoutProperties(props, ["store", "setStore", "queryName"]);

        var variablesData = getVariablesData(variables, other);
        var cacheName = getCacheName(_query.name, variablesData);
        var previousResult = Object.assign({}, store);

        if (forcedUpdate || !cache.exist(cacheName)) {
          var loading = true; //延迟设置加载

          setTimeout(function () {
            setStore(queryName, {
              loading: loading
            });
          }); //判断是否更新数据

          _query(variablesData).then(function (res) {
            cache.set(cacheName, {
              name: queryName,
              data: res
            });
            var resData = res;

            if (updateQuery) {
              var fetchMoreResult = Object.assign({}, res);
              resData = updateQuery(previousResult, fetchMoreResult);
            }

            resData.loading = loading = false;
            resData.error = null;
            setStore(queryName, resData);
          }).catch(function (err) {
            loading = false;
            setStore(queryName, {
              error: err.message,
              loading: false
            });
          });
        } else {
          var fetchMoreResult = Object.assign({}, cache.getData(cacheName));

          if (updateQuery) {
            var resData = updateQuery(previousResult, fetchMoreResult);
            setStore(queryName, resData);
          } else if (!store) {
            setStore(queryName, fetchMoreResult);
          }
        }
      }
    }, {
      key: "refetch",
      value: function refetch() {
        if (!forcedUpdate) {
          cache.clearByName(this.props.queryName);
        }

        this.query(this.props, variables, true);
      }
    }, {
      key: "fetchMore",
      value: function fetchMore(_ref2) {
        var _ref2$variables = _ref2.variables,
            variables = _ref2$variables === void 0 ? {} : _ref2$variables,
            _ref2$forcedUpdate = _ref2.forcedUpdate,
            forcedUpdate = _ref2$forcedUpdate === void 0 ? false : _ref2$forcedUpdate,
            _ref2$awaitQuery = _ref2.awaitQuery,
            awaitQuery = _ref2$awaitQuery === void 0 ? false : _ref2$awaitQuery,
            updateQuery = _ref2.updateQuery;
        this.awaitQuery = awaitQuery;
        this.query(this.props, variables, forcedUpdate, updateQuery);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            store = _this$props.store,
            setStore = _this$props.setStore,
            queryName = _this$props.queryName,
            other = _objectWithoutProperties(_this$props, ["store", "setStore", "queryName"]); //剔除store setStore


        var newProps = _objectSpread({}, other, _defineProperty({
          refetch: this.refetch.bind(this),
          fetchMore: this.fetchMore.bind(this)
        }, queryName, store || {}));

        if (this.awaitQuery && !store) {
          return null;
        }

        if (renderFun) {
          return renderFun(newProps);
        } else if (WrappedComponent) {
          return React.createElement(WrappedComponent, newProps);
        }
      }
    }]);

    return QueryComponent;
  }(React.Component);

  return QueryComponent;
}

var covenant = function covenant(name, value) {
  return {
    type: "covenant/".concat(name),
    name: name,
    value: value
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return redux.bindActionCreators({
    covenantAct: covenant
  }, dispatch);
}; //组件


var Query =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Query, _React$Component);

  function Query(props) {
    var _this;

    _classCallCheck(this, Query);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Query).call(this, props));
    var query = props.query,
        type = props.type,
        name = props.name,
        variables = props.variables,
        _props$forcedUpdate = props.forcedUpdate,
        forcedUpdate = _props$forcedUpdate === void 0 ? false : _props$forcedUpdate,
        _props$awaitQuery = props.awaitQuery,
        awaitQuery = _props$awaitQuery === void 0 ? false : _props$awaitQuery,
        updateQuery = props.updateQuery,
        children = props.children;

    if (typeof children != 'function') {
      throw Error('children must be a Function');
    }

    _this.QueryComponent = getQueryComponent({
      query: query,
      queryType: type,
      name: name,
      variables: variables,
      forcedUpdate: forcedUpdate,
      awaitQuery: awaitQuery,
      updateQuery: updateQuery,
      renderFun: children
    });
    return _this;
  }

  _createClass(Query, [{
    key: "render",
    value: function render() {
      var QueryComponent = this.QueryComponent;
      return React.createElement(QueryComponent, null);
    }
  }]);

  return Query;
}(React.Component); // 连接器

var queryConnect = function queryConnect(query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (WrappedComponent) {
    var _dec, _class;

    var mapStateToProps = function mapStateToProps(state) {
      var queryName = options.name || query.name;
      return {
        queryName: queryName,
        store: state.covenant[queryName] || null
      };
    };

    var QueryConsumer = (_dec = reactRedux.connect(mapStateToProps, mapDispatchToProps), _dec(_class =
    /*#__PURE__*/
    function (_React$Component2) {
      _inherits(QueryConsumer, _React$Component2);

      function QueryConsumer(props) {
        var _this2;

        _classCallCheck(this, QueryConsumer);

        _this2 = _possibleConstructorReturn(this, _getPrototypeOf(QueryConsumer).call(this, props));
        _this2.QueryComponent = getQueryComponent(_objectSpread({}, options, {
          query: query,
          WrappedComponent: WrappedComponent
        }));
        return _this2;
      }

      _createClass(QueryConsumer, [{
        key: "render",
        value: function render() {
          var _this3 = this;

          var QueryComponent = this.QueryComponent;
          return React.createElement(QueryComponent, _extends({}, this.props, {
            setStore: function setStore(name, value) {
              _this3.props.covenantAct(name, value);
            }
          }));
        }
      }]);

      return QueryConsumer;
    }(React.Component)) || _class);
    return QueryConsumer;
  };
};

var covenant$1 = function covenant() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type && action.type.startsWith('covenant/')) {
    var value = Object.assign({}, state[action.name], action.value);
    return Object.assign({}, state, _defineProperty({}, action.name, value));
  }

  return state;
};

var query = queryConnect;
var covenant$2 = covenant$1;

exports.query = query;
exports.covenant = covenant$2;
