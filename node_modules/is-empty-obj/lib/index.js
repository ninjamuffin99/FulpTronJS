"use strict";

/**
 * isEmptyObj
 * Check if an object is empty or not. This will throw if you don't pass an object.
 *
 * @name isEmptyObj
 * @function
 * @param {Object|Array} obj The input object.
 * @return {Boolean} `true` if the object doesn't have any keys. `false` otherwise.
 */

module.exports = function isEmptyObj(obj) {
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            return false;
        }
    }
    return true;
};