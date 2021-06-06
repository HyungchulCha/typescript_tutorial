"use strict";
function A(a, b) {
    var c = [];
    for (var i = 0; i < b; i++) {
        c.push(a);
    }
    return c;
}
// 함수를 호출할 때 타입 T가 결정된다.
// 현재 a 함수 첫번째 매개변수 타입을 알면 타입 T도 알 수 있기 때문에 호출 시 타입 T의 정보를 명시적으로 전달하지 않아도 된다.
var a01 = A(1, 10);
var a02 = A('a', 10);
var a03 = A(2, 10);
var a04 = A('b', 10);
var B = /** @class */ (function () {
    function B() {
        this.c = [];
    }
    B.prototype.push = function (d) {
        this.c.push(d);
    };
    B.prototype.pop = function () {
        return this.c.pop();
    };
    return B;
}());
var b01 = new B();
b01.push(1);
var r01 = b01.pop();
var b02 = new B();
b02.push('a');
var r02 = b02.pop();
var b03;
b03 = b01;
b03 = b02; // type error
// extends 키워드로 타입 제한
function C(a) {
    return a;
}
C(1);
C('a');
C([]); // type error
// SubD 타입으로 된 값은 D에 할당가능하다.
var d01 = { a: 'a', b: 1 };
var d02 = d01; // type error, missing SubD.c
var d03 = { a: 'a', b: 1, c: true };
var d04 = d03;
function E(a, b, c) {
    // T는 타입 D로 제한, K는 타입 D 키 값으로 제한
    var d = a[c];
    a[c] = b[c];
    b[c] = d;
}
var e01 = { a: 'a', b: 1, c: true };
var e02 = { a: 'a', b: 1, c: true };
E(e01, e02, 'b');
var f01 = { a: 'a', d: 1 };
var f02 = { a: 'a', d: 1 };
E(f01, f02, 'b'); // type error, missing D.b
