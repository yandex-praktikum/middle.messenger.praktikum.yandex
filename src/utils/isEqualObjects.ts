type Object = {
  [key: string]: any
}

export default function isEqualObjects(a: Object, b: Object): boolean {
  for (const key of Object.keys(a)) {
    if (a[key]?.constructor === Object) {
      if (b[key]?.constructor !== Object) {
        return false;
      }

      if (!isEqualObjects(a[key], b[key])) {
        return false;
      }
    }

    if (String(a[key]) !== String(b[key])) {
      return false;
    }
  }

  return true;
}
