// enum number type - ex) A[0] = 'B', A['B'] = 0
// enum string type - ex) A['B'] = 'b'

export function getElementLength(enumObj: any) {
  const keys = Object.keys(enumObj);
  return keys.reduce((acc, key) => (typeof enumObj[key] === 'string' ? acc + 1 : acc), 0);
}

export function isValueEnumValue(enumObj: any, value: number | string) {
  if (typeof value === 'number') {
    return !!enumObj[value];
  } else {
    return Object.keys(enumObj)
      .filter((key) => isNaN(Number(key)))
      .some((key) => enumObj[key] === value);
  }
}
