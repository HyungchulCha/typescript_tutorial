let a: number = 123;
let b: boolean = a >= 100;
let c: string = b ? 'big' : 'small';
let d: number[] = [1, 2];
let e: Array<number> = [1, 2];
let f: [number, string] = [a, c];
f[0] = 1;
f[0] = 'a'; // type error
let g: undefined = undefined;
g = 1; // type error
let h: null = null;
let i: number | undefined = undefined;
i = 1;
let j: 1 | 2;
j = 1;
j = 3; // type error
let k: 'a' | 'b';
k = 'a';
k = 'c'; // type error
let l: any;
l = 1;
l = 'a';
l = true;
l = () => {};
l = [];
l = {};
let m: object;
m = { a: 'a' };
console.log(m.b); // type error

let n = (): void => {
  console.log('a');
};
let o = (): never => {
  throw new Error('error');
};
let p = (): never => {
  while (true) {
    console.log(a);
  }
};

let r: (1 | 2 | 3) & (3 | 4 | 5);
r = 3;
r = 1; // type error

type s = number | string;
let t: s;
t = 1;
t = 'a';

import { getElementLength, isValueEnumValue } from './util';

enum A {
  B,
  C = 3,
  D,
}

let E: A = A.B;
let F: A.B | A.C = A.C;
console.log(A.B, A.C, A.D); // 0, 3, 4
console.log(A.C, A['C'], A[3]); // 3, 3, C

enum G {
  H = 'h',
  I = 'i',
  J = 'j',
}

console.log(getElementLength(A), getElementLength(G)); // 3, 3
console.log(isValueEnumValue(A, 3)); // true
console.log(isValueEnumValue(A, 5)); // false
console.log(isValueEnumValue(G, 'h')); // true
console.log(isValueEnumValue(G, 'k')); // false

// 상수 열거형 타입
// 상수 열거형 타입은 컴파일 후에 남지 않는다.
// 열거형 타입의 객체를 사용할 수 없다.
const enum K {
  L,
  M,
  N,
}

const O: K = K.L;

const enum P {
  Q = 'q',
  R = 'r',
  S = 's',
}

const T: P = P.Q;

console.log(getElementLength(K), getElementLength(P));

function f01(U: string, V: number, W?: string): string {
  const X = U.substr(0, 10);
  const Y = V >= 35 ? 'a' : 'b';
  const Z = W ? W.substr(0, 10) : '';
  return `${X}, ${Y}, ${Z}`;
}

function f02(U: string, W?: string, V: number): string {
  // type error
  const X = U.substr(0, 10);
  const Y = V >= 35 ? 'a' : 'b';
  const Z = W ? W.substr(0, 10) : '';
  return `${X}, ${Y}, ${Z}`;
}

function f03(U: string, W: string | undefined, V: number): string {
  const X = U.substr(0, 10);
  const Y = V >= 35 ? 'a' : 'b';
  const Z = W ? W.substr(0, 10) : '';
  return `${X}, ${Y}, ${Z}`;
}

function f04(U: string, V: number = 1, W: string = 'a'): string {
  // 기본값이 있는 매개변수는 선택 매개변수다.
  const X = U.substr(0, 10);
  const Y = V >= 35 ? 'a' : 'b';
  const Z = W ? W.substr(0, 10) : '';
  return `${X}, ${Y}, ${Z}`;
}

const f05: (a: string, b?: number, c?: string) => string = f04;

function f06(a: string, ...rest: string[]): string {
  return 'a';
}

function f07(this: string, a: number): string {
  const b = this.splt(','); // type error, this 타입 정의하지 않으면 any, 그래서 오타에서 감지를 못한다. this 타입은 매개변수 첫 번째에 정의할 수 있다.
}

interface String {
  getParam(this: string, index: number): string;
}
String.prototype.getParam = getParam;
console.log(`efsfse,12341,gaedrg`.getParam(1));

function f08(a: number, b: number): number;
function f08(a: string, b: string): string;
// @ ts-ignore
function f08(a: number | string, b: number | string): number | string {
  // 실제 구현하는 쪽에서 정의한 타입은 함수 오버로드의 타입목록에서 제외된다.
  if (typeof a === 'number' && b === 'number') {
    return a + b;
  } else {
    const result = Number(a) + Number(b);
    return result.toString();
  }
}
