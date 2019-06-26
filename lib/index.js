'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.undoHistoryReducer = exports.createUndoMiddleware = undefined;

var _createUndoMiddleware2 = require('./createUndoMiddleware');

var _createUndoMiddleware3 = _interopRequireDefault(_createUndoMiddleware2);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _actions2 = require('./actions');

var _actions = _interopRequireWildcard(_actions2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createUndoMiddleware = _createUndoMiddleware3.default;
exports.undoHistoryReducer = _reducer2.default;
exports.actions = _actions;