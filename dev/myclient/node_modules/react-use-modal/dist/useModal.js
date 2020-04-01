"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useModal;

var _react = _interopRequireDefault(require("react"));

var _ModalProvider = _interopRequireDefault(require("./ModalProvider"));

var _context = _interopRequireDefault(require("./context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useModal(friendID) {
  return _react.default.useContext(_context.default);
}