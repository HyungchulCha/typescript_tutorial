"use strict";
var _a, _b;
var b01 = {}; // b01은 기존 정의된 인터페이스 A에 value를 boolean 값으로 적용한거다.
b01.a = true;
b01.b = false;
b01.c = true; // type error, A에 c라는 키 값은 없다.
var D;
(function (D) {
    D[D["a"] = 0] = "a";
    D[D["b"] = 1] = "b";
    D[D["c"] = 2] = "c";
    // add d
})(D || (D = {}));
var d01 = (_a = {},
    _a[D.a] = 10,
    _a[D.b] = 20,
    _a[D.c] = 30,
    _a);
var d02 = (_b = {},
    // type error, missing D.c
    _b[D.a] = 10,
    _b[D.b] = 20,
    _b);
var f01 = function (a) { return String(a); };
/*
  function a(a: string, b: number): number {}
  const a = function (a: string, b: number): number {}
  const a = (a: string, b: number): number => {}
 */
function f02(a) {
    return a.length;
}
var j01 = { a: 'a' };
var l01 = { a: 'a', b: 'b', c: true, d: 'd' };
