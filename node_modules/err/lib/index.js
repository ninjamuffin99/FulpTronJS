"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var typpy = require("typpy"),
    iterateObject = require("iterate-object"),
    barbe = require("barbe");

/**
 * Err
 * Create a custom error object.
 *
 * @name Err
 * @function
 * @param {String|Error|Object} error The error message or an existing `Error`
 * instance or the `data` object where the `message` is the error message.
 * @param {String|Object} code The error code or the data object.
 * @param {Object} data The data object (its fields will be appended to the
 * `Error` object).
 * @return {Error} The custom `Error` instance.
 */
module.exports = function (_Error) {
    _inherits(Err, _Error);

    function Err(error, code, data) {
        _classCallCheck(this, Err);

        // Err({ message: "...", code: "...", ... });
        if (typpy(error, Object)) {
            data = error;
            error = data.message;
            delete data.message;
            code = data.code;
        }

        // Err(message, code, data);
        // Err(message, data);
        if (typpy(data, Object)) {
            data.code = code;
        } else if (typpy(code, Object)) {
            data = code;
            code = undefined;
        } else if (!typpy(code, undefined)) {
            data = { code: code };
        }

        if (typeof error === "string") {
            error = barbe(error, ["<", ">"], data);
        }

        // Create the error

        var _this = _possibleConstructorReturn(this, (Err.__proto__ || Object.getPrototypeOf(Err)).call(this, error));

        if (data) {
            iterateObject(data, function (v, n) {
                _this[n] = v;
            });
        }
        return _this;
    }

    return Err;
}(Error);