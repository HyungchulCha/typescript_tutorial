function A<T>(a: T, b: number): T[] {
  const c: T[] = [];
  for (let i = 0; i < b; i++) {
    c.push(a);
  }
  return c;
}

// 함수를 호출할 때 타입 T가 결정된다.
// 현재 a 함수 첫번째 매개변수 타입을 알면 타입 T도 알 수 있기 때문에 호출 시 타입 T의 정보를 명시적으로 전달하지 않아도 된다.
const a01 = A<number>(1, 10);
const a02 = A<string>('a', 10);
const a03 = A(2, 10);
const a04 = A('b', 10);

class B<D> {
  private c: D[] = [];
  push(d: D) {
    this.c.push(d);
  }
  pop() {
    return this.c.pop();
  }
}

const b01 = new B<number>();
b01.push(1);
const r01 = b01.pop();
const b02 = new B<string>();
b02.push('a');
const r02 = b02.pop();

let b03: B<number>;
b03 = b01;
b03 = b02; // type error

// extends 키워드로 타입 제한
function C<T extends string | number>(a: T): T {
  return a;
}
C(1);
C('a');
C([]); // type error

interface D {
  a: string;
  b: number;
}
interface SubD extends D {
  // interface에 extends는 확장개념
  c: boolean;
}

// SubD 타입으로 된 값은 D에 할당가능하다.
let d01: D = { a: 'a', b: 1 };
let d02: SubD = d01; // type error, missing SubD.c

let d03: SubD = { a: 'a', b: 1, c: true };
let d04: D = d03;

function E<T extends D, K extends keyof D>(a: T, b: T, c: K): void {
  // T는 타입 D로 제한, K는 타입 D 키 값으로 제한
  const d = a[c];
  a[c] = b[c];
  b[c] = d;
}

const e01: SubD = { a: 'a', b: 1, c: true };
const e02: SubD = { a: 'a', b: 1, c: true };
E(e01, e02, 'b');

interface F {
  a: string;
  d: number;
}

const f01: F = { a: 'a', d: 1 };
const f02: F = { a: 'a', d: 1 };
E(f01, f02, 'b'); // type error, missing D.b
