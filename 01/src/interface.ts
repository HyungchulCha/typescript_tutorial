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
