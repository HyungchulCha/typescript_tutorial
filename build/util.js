"use strict";
// enum number type - ex) A[0] = 'B', A['B'] = 0
// enum string type - ex) A['B'] = 'b'
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValueEnumValue = exports.getElementLength = void 0;
function getElementLength(enumObj) {
    var keys = Object.keys(enumObj);
    return keys.reduce(function (acc, key) { return (typeof enumObj[key] === 'string' ? acc + 1 : acc); }, 0);
}
exports.getElementLength = getElementLength;
function isValueEnumValue(enumObj, value) {
    if (typeof value === 'number') {
        return !!enumObj[value];
    }
    else {
        return Object.keys(enumObj)
            .filter(function (key) { return isNaN(Number(key)); })
            .some(function (key) { return enumObj[key] === value; });
    }
}
exports.isValueEnumValue = isValueEnumValue;
