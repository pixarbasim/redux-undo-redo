'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.undo = undo;
exports.redo = redo;
exports.addUndoItem = addUndoItem;
exports.clear = clear;
function undo() {
  return { type: 'UNDO_HISTORY@UNDO' };
}

function redo() {
  return { type: 'UNDO_HISTORY@REDO' };
}

function addUndoItem(action, beforeState, afterState, args) {
  return {
    type: 'UNDO_HISTORY@ADD',
    payload: {
      action: action,
      beforeState: beforeState,
      afterState: afterState,
      args: args
    }
  };
}

function clear() {
  return {
    type: 'UNDO_HISTORY@CLEAR'
  };
}