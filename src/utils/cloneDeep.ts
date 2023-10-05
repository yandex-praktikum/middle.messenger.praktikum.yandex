import { isArray, isPlainObject, isArrayOrObject } from './index';

type Object = {
  [key: string]: any
}

export default function cloneDeep(structure: Object) {
  if (!isArrayOrObject(structure)) {
    return structure;
  }

  let root: Object;

  if (isArray(structure)) {
    root = [];
  } else if (isPlainObject(structure)) {
    root = {};
  } else {
    throw new Error(`${structure} is not an instance of an array or an object`);
  }

  for (const [key, value] of Object.entries(structure)) {
    if (isArrayOrObject(value)) {
      root[key] = cloneDeep(value);
    } else {
      root[key] = value;
    }
  }

  return root;
}
