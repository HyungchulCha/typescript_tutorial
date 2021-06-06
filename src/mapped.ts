interface A {
  a: string;
  b: number;
}

// 맵드 타입은 in 키워드를 사용해서 정의한다. in 키워드 오른쪽에는 문자열의 유니온 타입이 올 수 있다.
type T01 = { [K in 'prop1' | 'prop2']: boolean }; // { prop1: boolean; prop2: boolean; }

type B<T> = { [P in keyof T]?: boolean }; // T의 키값을 활용해서 새로운 타입을 정의
const b01: B<A> = {}; // b01은 기존 정의된 인터페이스 A에 value를 boolean 값으로 적용한거다.
b01.a = true;
b01.b = false;
b01.c = true; // type error, A에 c라는 키 값은 없다.

// Partial, Readonly - 내장타입, 맵드타입으로 만들어졌다.
type T02 = A['a'];
type Readonly01<T> = { readonly [P in keyof T]: T[P] }; // 기존 타입을 readonly로 바꾼다.
type Partial01<T> = { [P in keyof T]?: T[P] }; // 기존 타입을 optional로 바꾼다.
type T03 = Readonly01<A>; // 기존 인터페이스 A를 readonly로 바꿈
type T04 = Partial01<A>; // 기존 인터페이스 A를 optional로 바꿈

// Pick - 내장타입, 인터페이스에서 원하는 속성만 추출할 때 사용한다.
interface C {
  a: string;
  b: number;
  c: boolean;
}
type Pick01<T, K extends keyof T> = { [P in K]: T[P] }; // 인터페이스 T의 속성 K를 입력해서 원하는 속성 + 값(타입)만 추출한다.
type T05 = Pick01<C, 'a' | 'c'>; // type T05 = { a: string; c: boolean; }

// Record - 내장타입, 입력된 모든 속성을 같은 타입으로 만들어준다.
type Record01<K extends string, T> = { [P in K]: T };
type T06 = Record01<'a' | 'b', C>; // type T06 = { a: C; b: C; }

enum D {
  a,
  b,
  c,
  // add d
}
const d01 = {
  [D.a]: 10,
  [D.b]: 20,
  [D.c]: 30,
  // forgot d, no error
};
const d02: { [key in D]: number } = {
  // type error, missing D.c
  [D.a]: 10,
  [D.b]: 20,
};

// 조건부 타입 - 입력된 제네릭 타입에 따라 타입을 결정할 수 있는 기능, extends와 ? 기호를 사용해서 정의한다.
// T extends U ? X : Y
type T07<T> = T extends string ? 'a' : 'b';
type T08 = T07<string>; // 'a'
type T09 = T07<number>; // 'b'
type T10 = T07<string | number>; // 'a' | 'b'
type T11 = T07<string> | T07<number>; // 'a' | 'b'

// Exclude, Extract - 내장타입
type T12 = string | number | never; // string | number
type Exclude01<T, U> = T extends U ? never : T; // U만 제외한다.
type T13 = Exclude01<1 | 3 | 5 | 7, 1 | 5 | 9>; // 3 | 7
type Extract01<T, U> = T extends U ? T : never; // U만 가져온다.
type T14 = Extract01<1 | 3 | 5 | 7, 1 | 5 | 9>; // 1 | 5

// ReturnType - 내장타입, 함수의 반환 타입을 추출한다.
// infer 키워드 덕분에 함수의 반환 타입을 R이라는 변수에 담을 수 있다.
// infer 키워드는 조건부 타입을 정의할 때 extends 키워드 뒤에 사용된다.
type ReturnType01<T> = T extends (...arg: any[]) => infer R ? R : any;
type T15 = ReturnType01<() => string>; // string
const f01 = (a: string): string => String(a);
type T16 = ReturnType01<typeof f01>; // string
/*
  function a(a: string, b: number): number {}
  const a = function (a: string, b: number): number {}
  const a = (a: string, b: number): number => {}
 */
function f02(a: string): number {
  return a.length;
}
type T17 = ReturnType01<typeof f02>; // number

type E<T> = T extends (infer U)[] ? U : T extends (...arg: any[]) => infer U ? U : T extends Promise<infer U> ? U : T;
// 1. 타입 T가 U의 배열이면 U가 사용된다.
// 2. 함수면 반환타입이 사용된다.
// 3. 프로미스면 프로미스에 입력된 제네릭 타입이 사용된다.
type T18 = E<string>; // string;
type T19 = E<string[]>; // string;
type T20 = E<() => string>; // string
type T21 = E<Promise<string>>; // string
type T22 = E<Promise<string>[]>; // Promise<string>
type T23 = E<E<Promise<string>[]>>; // string

// 인터페이스에서 문자열 속성만 추출해서 사용하는 유틸리티 타입
type F<T> = {
  [K in keyof T]: T[K] extends String ? K : never;
}[keyof T]; // [keyof T]는 인터페이스에서 모든 속성의 타입을 유니온으로 추출한다. 이 때 never 타입은 제거된다.
type G<T> = Pick<T, F<T>>;
interface H {
  a: string;
  b: number;
  c: boolean;
  d: string;
}
type T24 = F<H>; // "a" | "d"
type T25 = G<H>; // { a: string; b: string; }

// 일부 속성만 제거해 주는 유틸리티 타입
type I<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;
interface J {
  a: string;
  b: number;
  c: boolean;
}
type T26 = I<J, 'b' | 'c'>;
const j01: T26 = { a: 'a' };

// 인터페이스를 덮어쓰는 유틸리티 타입
type K<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U; // T, U 중복 제거하고 U로 덮어씀
interface L {
  a: string;
  b: number;
}
type T27 = K<L, { b: string; c: boolean; d: string }>;
const l01: T27 = { a: 'a', b: 'b', c: true, d: 'd' };
