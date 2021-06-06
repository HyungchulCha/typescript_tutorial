interface A {
  a: string;
  b?: number;
  c: string | undefined;
  readonly d: number;
}
const a1: A = { a: 'a' }; // type error
const a2: A = { a: 'a', c: undefined, d: 1 };
a2.d = 2; // type error

interface B {
  readonly a: string;
  b?: number;
}

const b1: B = { a: 'a', c: 'c' }; // type error, 인터페이스에 정의되지 않은 속성을 리터럴로 입력하므로 타입 에러가 발생한다. 리터럴에서 에러가 발생하는 이유는 개발자의 실수일 확률이 높기 때문이다.
const b2 = { a: 'a', c: 'c' };
const b3: B = b2; // b3가 b2의 타입을 포함하는 더 큰 타입이기 때문에 에러가 발생하지 않는다.
console.log(b3);

interface C {
  readonly a: string;
  b: number;
  [key: string]: string | number;
}

const c1: C = {
  a: 'a',
  c: 'c',
  d: 1,
  b: 'b', // type error, 명시적으로 숫자로 정의했기 때문에 문자열을 입력하면 타입 에러가 발생한다.
};

// 자바스크립트에서는 속성 이름에 숫자와 문자열을 사용할 수 있다. 그리고 속성 이름에 숫자를 사용하면 문자열로 변환된 후 사용된다.
// 따라서 숫자인 속성 이름의 값이 문자열인 속성 이름의 값으로 할당 가능한지 검사한다.
interface D {
  [a: number]: number;
  [b: string]: string | number;
}

const d1: D = {};
d1[1] = 1;
d1[2] = 'a'; // type error
d1['1'] = 1;
d1['2'] = 'a';

interface E {
  (a: string, b: number): string; // 인터페이스로 함수 정의할 때는 속성 이름 없이 정의한다.
  c: number;
}

const e: E = (a, b) => {
  const aa = a.substr(0, 10);
  const bb = b >= 35 ? 'a' : 'b';
  return `${aa}, ${bb}`;
};
e.c = 1;

interface F {
  a: string;
  b: number;
  c(d: number): boolean;
}

class SomeF implements F {
  // implements 키워드를 사용해서 인터페이스를 클래스로 구현할 수 있다. 만약에 하나의 속성이라도 구현하지 않으면 컴파일 에러가 발생한다.
  a: string;
  b: number;
  constructor(a: string, b: number) {
    this.a = a;
    this.b = b;
  }
  c(d: number) {
    return true;
  }
}

interface G {
  a: string;
  b: number;
}
interface H extends G {
  c: boolean;
}
/*
interface H {
  a: string;
  b: number;
  c: boolean
}
 */

interface I {
  d: string;
}

interface J extends G, I {
  e: boolean;
}

interface K {
  a: string;
  b: number;
}

interface L {
  a: string;
  c: boolean;
}

type M = K & L; // 합친 거라고 생각하는게 이해하기 쉬울 듯
const m01: M = {
  a: 'a',
  b: 1,
  c: true,
};
const m02: M = {
  // type error
  a: 'a',
  b: 1,
};
const m03: M = {
  a: 'a',
  b: 1,
  c: true,
  d: 'b', // type error
};

function N(a: number, b: number | string) {
  const v1: number | string = a;
  const v2: number = b; // type error, if b = string ?
}

function O(a: 1 | 2) {
  const v1: 1 | 3; = a; // type error if a = 2 ?
  const v2: 1 | 2 | 3 = a;
}

interface P01 {
  a: string;
  b: number;
}

interface Q01 {
  a: string;
  b: number;
}

const p01: P01 = {a: 'a', b: 1};
const q01: Q01 = p01;

interface P02 {
  a: string;
  b?: number;
}

const p02: P02 = {a: 'a'};
const q02: Q01 = p02; // type error, essential Q01.b

const q03: Q01 = {a: 'a', b: 1}
const p03: P02 = q03;

interface P04 {
  a: string;
  b: number;
  c: boolean
}

interface Q04 {
  a: string;
  b: number | string;
}

const p04: P04 = {a: 'a', b: 1, c: true};
const q04: Q04 = p04;

const q05: Q04 = {a: 'a', b: 'b'};
const p05: P04 = q05; // type error, essential P04.b number, P04.c boolean

// 함수는 호출하는 시점에 문제가 없어야 한다.
type F01 = (a: string, b: number) => string;
type F02 = (a: string) => string;
type F03 = (a: string) => string | number;

let f01: F01 = (a, b) => 'a';
let f02: F02 = a => 'a';
let f03: F03 = a => 1;
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