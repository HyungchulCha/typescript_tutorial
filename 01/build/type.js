"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = 123;
var b = a >= 100;
var c = b ? 'big' : 'small';
var d = [1, 2];
var e = [1, 2];
var f = [a, c];
f[0] = 1;
f[0] = 'a'; // type error
var g = undefined;
g = 1; // type error
var h = null;
var i = undefined;
i = 1;
var j;
j = 1;
j = 3; // type error
var k;
k = 'a';
k = 'c'; // type error
var l;
l = 1;
l = 'a';
l = true;
l = function () { };
l = [];
l = {};
var m;
m = { a: 'a' };
console.log(m.b); // type error
var n = function () {
    console.log('a');
};
var o = function () {
    throw new Error('error');
};
var p = function () {
    while (true) {
        console.log(a);
    }
};
var r;
r = 3;
r = 1; // type error
var t;
t = 1;
t = 'a';
var util_1 = require("./util");
var A;
(function (A) {
    A[A["B"] = 0] = "B";
    A[A["C"] = 3] = "C";
    A[A["D"] = 4] = "D";
})(A || (A = {}));
var E = A.B;
var F = A.C;
console.log(A.B, A.C, A.D); // 0, 3, 4
console.log(A.C, A['C'], A[3]); // 3, 3, C
var G;
(function (G) {
    G["H"] = "h";
    G["I"] = "i";
    G["J"] = "j";
})(G || (G = {}));
console.log(util_1.getElementLength(A), util_1.getElementLength(G)); // 3, 3
console.log(util_1.isValueEnumValue(A, 3)); // true
console.log(util_1.isValueEnumValue(A, 5)); // false
console.log(util_1.isValueEnumValue(G, 'h')); // true
console.log(util_1.isValueEnumValue(G, 'k')); // false
var O = 0 /* L */;
var T = "q" /* Q */;
console.log(util_1.getElementLength(K), util_1.getElementLength(P));
function f01(U, V, W) {
    var X = U.substr(0, 10);
    var Y = V >= 35 ? 'a' : 'b';
    var Z = W ? W.substr(0, 10) : '';
    return X + ", " + Y + ", " + Z;
}
function f02(U, W, V) {
    // type error
    var X = U.substr(0, 10);
    var Y = V >= 35 ? 'a' : 'b';
    var Z = W ? W.substr(0, 10) : '';
    return X + ", " + Y + ", " + Z;
}
function f03(U, W, V) {
    var X = U.substr(0, 10);
    var Y = V >= 35 ? 'a' : 'b';
    var Z = W ? W.substr(0, 10) : '';
    return X + ", " + Y + ", " + Z;
}
function f04(U, V, W) {
    if (V === void 0) { V = 1; }
    if (W === void 0) { W = 'a'; }
    // 기본값이 있는 매개변수는 선택 매개변수다.
    var X = U.substr(0, 10);
    var Y = V >= 35 ? 'a' : 'b';
    var Z = W ? W.substr(0, 10) : '';
    return X + ", " + Y + ", " + Z;
}
var f05 = f04;
function f06(a) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return 'a';
}
function f07(a) {
    var b = this.splt(','); // type error, this 타입 정의하지 않으면 any, 그래서 오타에서 감지를 못한다. this 타입은 매개변수 첫 번째에 정의할 수 있다.
}
String.prototype.getParam = getParam;
console.log("efsfse,12341,gaedrg".getParam(1));
// @ ts-ignore
function f08(a, b) {
    // 실제 구현하는 쪽에서 정의한 타입은 함수 오버로드의 타입목록에서 제외된다.
    if (typeof a === 'number' && b === 'number') {
        return a + b;
    }
    else {
        var result = Number(a) + Number(b);
        return result.toString();
    }
}
