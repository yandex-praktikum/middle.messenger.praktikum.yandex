import { isArray, isPlainObject } from './index';

export default function isArrayOrObject(structure: any): boolean {
  return isArray(structure) || isPlainObject(structure);
}
