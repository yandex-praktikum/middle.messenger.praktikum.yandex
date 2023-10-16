import { merge } from "./index";

type Object = {
  [key: string]: any
}

export default function set(obj: Object, path: string, value: any): Object {
  if (obj.constructor !== Object) {
    return obj;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const keys = path.split('.');
  const objFromKeys = keys.reduceRight(
    (acc, key, i, { length }) => ({ [key]: i === length - 1 ? value : acc }),
    {},
  )

  return merge(obj, objFromKeys);
}
