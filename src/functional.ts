// let 변수는 재할당 가능하기 때문에 융통성 있게 타입이 결정된다.
let a01 = 1;
let a02 = 'a';
a01 = 'a'; // type error
a02 = 1; // type error

// const 변수를 리터럴 자체가 타입이 된다.
const a03 = 1;
const a04 = 'a';
let a05: typeof a03 | typeof a04; // 1 | 'a'

const a06 = [1, 2, 3];
const [v1, v2, v3] = a06; // v1, v2, v3, ... number
a06.push('a'); // type error

const a07 = [1, 'a', 3];
a07.push('b');

const a08 = { a: 'a', b: 1, c: 'c' }; // { a: string; b: number; c: string }
const { a, b, c } = a08;
console.log(a === b); // type error

interface B {
  a: string;
  b: number;
}

interface B01 extends B {
  c: boolean;
}

interface B02 extends B {
  d: boolean;
}

const b01: B = { a: 'a', b: 1 };
const b02: B01 = { a: 'a', b: 1, c: true };
const b03: B02 = { a: 'a', b: 1, d: false };
const b04 = [b01, b02, b03]; // B[]
const b05 = [b02, b03]; // (B01 | B02)[]

function C01(a = 'a', b = 1) {
  return `${a}${b}`;
}
C01(1, 2); // type error
const c01: number = C01('a', 1); // type error

function C02(a: number) {
  // function C02(a: number): number | string
  if (a < 10) {
    return a;
  } else {
    return `${a}`;
  }
}

// 타입가드 - 조건문을 이용해 타입의 범위를 좁히는 기능
// 타입단언(assertion)
function D01(a: number | string) {
  if (typeof a === 'number') {
    // 타입가드
    console.log((a as number).toFixed(2));
  } else {
    // 당연히 문자열이지만 타입가드가 없다면 as 키워드를 이용해서 타입단언을 해야 한다.
    console.log((a as string).trim());
  }
}

// typeof
function D02(a: number | string) {
  if (typeof a === 'number') {
    console.log(a.toFixed(2));
  } else {
    console.log(a.trim());
  }
}

// instanceof
class E01 {
  a: string;
  b: number;
  constructor(a: string, b: number) {
    this.a = a;
    this.b = b;
  }
}
class E02 {
  a: string;
  c: boolean;
  constructor(a: string, c: boolean) {
    this.a = a;
    this.c = c;
  }
}
function E03(a: E01 | E02) {
  console.log(a.a);
  if (a instanceof E01) {
    console.log(a.b);
  } else {
    console.log(a.c);
  }
}

// 잘못된 예
interface F01 {
  a: string;
  b: number;
}
interface F02 {
  a: string;
  c: boolean;
}
function F03(a: F01 | F02) {
  if (a instanceof F01) {
    // 인터페이스는 타입검사에만 사용되는데 컴파일 후에는 삭제가 되므로 instanceof 키워드의 오른쪽에 올 수 없다.
    console.log(a.b);
  } else {
    console.log(a.c);
  }
}

interface G01 {
  type: 'G01';
  a: string;
  b: number;
}
interface G02 {
  type: 'G02';
  a: string;
  c: boolean;
}
function G03(a: G01 | G02) {
  if (a.type === 'G01') {
    console.log(a.b);
  } else {
    console.log(a.c);
  }
}
function G04(a: G01 | G02) {
  switch (a.type) {
    case 'G01':
      console.log(a.b);
      break;
    case 'G02':
      console.log(a.c);
      break;
  }
}
function isG01(x: any): x is G01 {
  // is 왼쪽에는 매개변수 이름을, 오른쪽에는 타입 이름을 넣는다.
  return (x as G01).b !== undefined;
}
function G05(a: G01 | G02) {
  if (isG01(a)) {
    console.log(a.b);
  } else {
    console.log(a.c);
  }
}

function G06(a: G01 | G02) {
  if ('b' in a) {
    // 속성 이름 검사
    console.log(a.b);
  } else {
    console.log(a.c);
  }
}
