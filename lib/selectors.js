"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getUndoItem = exports.getUndoItem = function getUndoItem(state) {
  return state.undoHistory.undoQueue[0];
};
var getRedoItem = exports.getRedoItem = function getRedoItem(state) {
  return state.undoHistory.redoQueue[0];
};