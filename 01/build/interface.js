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
