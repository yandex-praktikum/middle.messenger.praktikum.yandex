const isObject = (value: unknown): boolean => typeof value === 'object' && value !== null;

export type Indexed<T = unknown> = {
    [key in string]: T
};

export const isDeepEqual = (a: Indexed, b: Indexed): boolean => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key: string) => {
    if (isObject(a[key]) || Array.isArray(a[key])) {
      if (isObject(b[key]) || Array.isArray(b[key])) {
        return isDeepEqual(a[key] as Indexed, b[key] as Indexed);
      }

      return false;
    }

    return a[key] === b[key];
  });
};
