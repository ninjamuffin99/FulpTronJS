"use strict";

var regexEscape = require("regex-escape"),
    typpy = require("typpy"),
    iterateObject = require("iterate-object");

/**
 * barbe
 * Renders the input template including the data.
 *
 * @name barbe
 * @function
 * @param {String} text The template text.
 * @param {Array} arr An array of two elements: the first one being the start snippet (default: `"{"`) and the second one being the end snippet (default: `"}"`).
 * @param {Object} data The template data.
 * @return {String} The rendered template.
 */
function barbe(text, arr, data) {
    if (!Array.isArray(arr)) {
        data = arr;
        arr = ["{", "}"];
    }

    if (!data || data.constructor !== Object) {
        return text;
    }

    arr = arr.map(regexEscape);

    var deep = function deep(obj, path) {
        iterateObject(obj, function (value, c) {
            path.push(c);
            if (typpy(value, Object)) {
                deep(value, path);
                path.pop();
                return;
            }
            text = text.replace(new RegExp(arr[0] + path.join(".") + arr[1], "gm"), typpy(value, Function) ? value : String(value));
            path.pop();
        });
    };

    deep(data, []);

    return text;
}

module.exports = barbe;