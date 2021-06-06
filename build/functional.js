"use strict";
// let 변수는 재할당 가능하기 때문에 융통성 있게 타입이 결정된다.
var a01 = 1;
var a02 = 'a';
a01 = 'a'; // type error
a02 = 1; // type error
// const 변수를 리터럴 자체가 타입이 된다.
var a03 = 1;
var a04 = 'a';
var a05; // 1 | 'a'
var a06 = [1, 2, 3];
var v1 = a06[0], v2 = a06[1], v3 = a06[2]; // v1, v2, v3, ... number
a06.push('a'); // type error
var a07 = [1, 'a', 3];
a07.push('b');
var a08 = { a: 'a', b: 1, c: 'c' }; // { a: string; b: number; c: string }
var a = a08.a, b = a08.b, c = a08.c;
console.log(a === b); // type error
var b01 = { a: 'a', b: 1 };
var b02 = { a: 'a', b: 1, c: true };
var b03 = { a: 'a', b: 1, d: false };
var b04 = [b01, b02, b03]; // B[]
var b05 = [b02, b03]; // (B01 | B02)[]
function C01(a, b) {
    if (a === void 0) { a = 'a'; }
    if (b === void 0) { b = 1; }
    return "" + a + b;
}
C01(1, 2); // type error
var c01 = C01('a', 1); // type error
function C02(a) {
    // function C02(a: number): number | string
    if (a < 10) {
        return a;
    }
    else {
        return "" + a;
    }
}
// 타입가드 - 조건문을 이용해 타입의 범위를 좁히는 기능
// 타입단언(assertion)
function D01(a) {
    if (typeof a === 'number') {
        // 타입가드
        console.log(a.toFixed(2));
    }
    else {
        // 당연히 문자열이지만 타입가드가 없다면 as 키워드를 이용해서 타입단언을 해야 한다.
        console.log(a.trim());
    }
}
// typeof
function D02(a) {
    if (typeof a === 'number') {
        console.log(a.toFixed(2));
    }
    else {
        console.log(a.trim());
    }
}
// instanceof
var E01 = /** @class */ (function () {
    function E01(a, b) {
        this.a = a;
        this.b = b;
    }
    return E01;
}());
var E02 = /** @class */ (function () {
    function E02(a, c) {
        this.a = a;
        this.c = c;
    }
    return E02;
}());
function E03(a) {
    console.log(a.a);
    if (a instanceof E01) {
        console.log(a.b);
    }
    else {
        console.log(a.c);
    }
}
function F03(a) {
    if (a instanceof F01) {
        // 인터페이스는 타입검사에만 사용되는데 컴파일 후에는 삭제가 되므로 instanceof 키워드의 오른쪽에 올 수 없다.
        console.log(a.b);
    }
    else {
        console.log(a.c);
    }
}
function G03(a) {
    if (a.type === 'G01') {
        console.log(a.b);
    }
    else {
        console.log(a.c);
    }
}
function G04(a) {
    switch (a.type) {
        case 'G01':
            console.log(a.b);
            break;
        case 'G02':
            console.log(a.c);
            break;
    }
}
function isG01(x) {
    // is 왼쪽에는 매개변수 이름을, 오른쪽에는 타입 이름을 넣는다.
    return x.b !== undefined;
}
function G05(a) {
    if (isG01(a)) {
        console.log(a.b);
    }
    else {
        console.log(a.c);
    }
}
function G06(a) {
    if ('b' in a) {
        // 속성 이름 검사
        console.log(a.b);
    }
    else {
        console.log(a.c);
    }
}
