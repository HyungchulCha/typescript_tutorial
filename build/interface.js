"use strict";
var a1 = { a: 'a' }; // type error
var a2 = { a: 'a', c: undefined, d: 1 };
a2.d = 2; // type error
var b1 = { a: 'a', c: 'c' }; // type error, 인터페이스에 정의되지 않은 속성을 리터럴로 입력하므로 타입 에러가 발생한다. 리터럴에서 에러가 발생하는 이유는 개발자의 실수일 확률이 높기 때문이다.
var b2 = { a: 'a', c: 'c' };
var b3 = b2; // b3가 b2의 타입을 포함하는 더 큰 타입이기 때문에 에러가 발생하지 않는다.
console.log(b3);
var c1 = {
    a: 'a',
    c: 'c',
    d: 1,
    b: 'b', // type error, 명시적으로 숫자로 정의했기 때문에 문자열을 입력하면 타입 에러가 발생한다.
};
var d1 = {};
d1[1] = 1;
d1[2] = 'a'; // type error
d1['1'] = 1;
d1['2'] = 'a';
var e = function (a, b) {
    var aa = a.substr(0, 10);
    var bb = b >= 35 ? 'a' : 'b';
    return aa + ", " + bb;
};
e.c = 1;
var SomeF = /** @class */ (function () {
    function SomeF(a, b) {
        this.a = a;
        this.b = b;
    }
    SomeF.prototype.c = function (d) {
        return true;
    };
    return SomeF;
}());
var m01 = {
    a: 'a',
    b: 1,
    c: true,
};
var m02 = {
    // type error
    a: 'a',
    b: 1,
};
var m03 = {
    a: 'a',
    b: 1,
    c: true,
    d: 'b', // type error
};
function N(a, b) {
    var v1 = a;
    var v2 = b; // type error, if b = string ?
}
function O(a) {
    var v1;
    a; // type error if a = 2 ?
    var v2 = a;
}
var p01 = { a: 'a', b: 1 };
var q01 = p01;
var p02 = { a: 'a' };
var q02 = p02; // type error, essential Q01.b
var q03 = { a: 'a', b: 1 };
var p03 = q03;
var p04 = { a: 'a', b: 1, c: true };
var q04 = p04;
var q05 = { a: 'a', b: 'b' };
var p05 = q05; // type error, essential P04.b number, P04.c boolean
var f01 = function (a, b) { return 'a'; };
var f02 = function (a) { return 'a'; };
var f03 = function (a) { return 1; };
f01('a'); // type error
f01('a', 1);
f02('a');
f02('a', 1); // type error
f03('a');
f03('a', 1); // type error
// 01. f02 -> f01
// 할당할 때 f01의 정의된 매개변수 'b'는 필수값이 아니므로 에러가 발생하지 않는다.
// 함수 매개변수는 정의 후 사용하지 않아도 에러가 발생되지 않는다.
// f01 = a => 'a';
// f01 = f02;
// 02. f01 -> f02, type error, parameter
// 정의되지 않는 매개변수가 할당될 때는 에러가 발생한다.
// f02 = (a, b) => 'a';
// f02 = f01;
// 03. f03 -> f01, f01 -> f03 type error, F03 return value number?
// f01 = a => 1;
// f01 = f03;
// f03 = (a, b) => 1;
// f03 = f01;
// 04. f03 -> f02 type error, F03 return value number?
// f02 = a => 1;
// f02 = f03;
// 05. f02 -> f03
// f03 = a => 'a';
// f03 = f02;
