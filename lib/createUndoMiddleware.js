'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

exports.default = createUndoMiddleware;

var _actions = require('./actions');

var _selectors = require('./selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUndoMiddleware(_ref) {
  var getViewState = _ref.getViewState,
      setViewState = _ref.setViewState,
      revertingActions = _ref.revertingActions,
      forwardingActions = _ref.forwardingActions;


  if (Object.values(revertingActions).some(function (revertingAction) {
    return revertingAction.meta;
  })) {
    console.warn('[redux-undo-redo] The "meta" property in reverting actions is deprecated and replaced with "createArgs" and will be removed in future versions.');
  }

  var SUPPORTED_ACTIONS = Object.keys(revertingActions);
  var acting = false;

  return function (_ref2) {
    var dispatch = _ref2.dispatch,
        getState = _ref2.getState;
    return function (next) {
      return function (action) {
        var state = getState();
        var ret = next(action);

        switch (action.type) {
          case 'UNDO_HISTORY@UNDO':
            {
              var undoItem = (0, _selectors.getUndoItem)(state);
              if (undoItem) {
                acting = true;
                setViewState && dispatch(setViewState(undoItem.afterState));
                dispatch(getUndoAction(undoItem));
                setViewState && dispatch(setViewState(undoItem.beforeState));
                acting = false;
              }
            }
            break;
          case 'UNDO_HISTORY@REDO':
            {
              var redoItem = (0, _selectors.getRedoItem)(state);
              if (redoItem) {
                acting = true;
                setViewState && dispatch(setViewState(redoItem.beforeState));
                dispatch(getRedoAction(redoItem));
                setViewState && dispatch(setViewState(redoItem.afterState));
                acting = false;
              }
            }
            break;
          default:
            if (!acting && (0, _includes3.default)(SUPPORTED_ACTIONS, action.type)) {
              dispatch((0, _actions.addUndoItem)(action, getViewState && getViewState(state), getViewState && getViewState(getState()), getUndoArgs(state, action)));
            }
            break;
        }

        return ret;
      };
    };
  };

  function getUndoAction(undoItem) {
    var action = undoItem.action,
        args = undoItem.args;
    var type = action.type;

    var actionCreator = (0, _get3.default)(revertingActions[type], 'action', revertingActions[type]);
    if (!actionCreator) {
      throw new Error('Illegal reverting action definition for \'' + type + '\'');
    }
    return actionCreator(action, args);
  }

  function getRedoAction(redoItem) {
    var action = redoItem.action,
        args = redoItem.args;
    var type = action.type;

    var actionCreator = (0, _get3.default)(forwardingActions[type], 'action', forwardingActions[type]);
    if (!actionCreator) {
      //If forwarding action is not defined, dispatch the action type
      return redoItem.action;
    }
    return actionCreator(action, args);
  }

  function getUndoArgs(state, action) {
    var argsFactory = (0, _get3.default)(revertingActions[action.type], 'createArgs');

    if (!argsFactory) {
      argsFactory = (0, _get3.default)(revertingActions[action.type], 'meta');
    }

    return argsFactory && argsFactory(state, action);
  }
}