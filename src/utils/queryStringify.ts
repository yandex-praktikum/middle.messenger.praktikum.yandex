import { isPlainObject, isArray } from './index';

type Object = {
  [key: string]: any
}

export default function queryStringify(structure: Object) {
  if (!isPlainObject(structure)) {
    throw new Error('input must be an object');
  }

  const root = [];

  for (const [key, value] of Object.entries(structure)) {
    if (isArray(value)) {
      value.forEach((item: any, i: string) => {
        root.push(`${key}[${i}]=${item}`);
      })
    } else if (isPlainObject(value)) {
      root.push(throughObject(value));
    } else {
      root.push(`${key}=${value}`)
    }
  }

  return root.join('&');
}

function throughObject(obj: Object) {
  const keys: string[] = [];
  let path = '';

  const innerFun = (innerObj: Object) => {
    for (const [key, value] of Object.entries(innerObj)) {
      if (path === '') {
        path += `${key}`;
      } else {
        path += `[${key}]`;
      }

      if (isPlainObject(value)) {
        innerFun(value);
      } else {
        keys.push(`${path}=${value}`);
        path = '';
      }
    }
  }

  innerFun(obj);

  return keys.join('&');
}
