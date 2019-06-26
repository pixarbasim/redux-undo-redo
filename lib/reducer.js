'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isNil2 = require('lodash/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

exports.default = undoHistoryReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var INITIAL_UNDO_HISTORY_STATE = {
  undoQueue: [],
  redoQueue: []
};

function undoHistoryReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_UNDO_HISTORY_STATE;
  var action = arguments[1];
  var type = action.type,
      undoItem = action.payload;
  var undoQueue = state.undoQueue,
      redoQueue = state.redoQueue;


  switch (type) {
    case 'UNDO_HISTORY@UNDO':
      {
        return undoQueue.length === 0 ? state : {
          undoQueue: undoQueue.slice(1),
          redoQueue: [undoQueue[0]].concat(_toConsumableArray(redoQueue))
        };
      }
    case 'UNDO_HISTORY@REDO':
      {
        return redoQueue.length === 0 ? state : {
          undoQueue: [redoQueue[0]].concat(_toConsumableArray(undoQueue)),
          redoQueue: redoQueue.slice(1)
        };
      }
    case 'UNDO_HISTORY@ADD':
      {
        return {
          undoQueue: [(0, _omitBy3.default)(undoItem, _isNil3.default)].concat(_toConsumableArray(undoQueue)),
          redoQueue: []
        };
      }
    case 'UNDO_HISTORY@CLEAR':
      return INITIAL_UNDO_HISTORY_STATE;
    default:
      return state;
  }
}