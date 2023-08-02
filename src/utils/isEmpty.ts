export function isEmpty(value: unknown) {
  if (typeof value === 'object') {
    if (value === null) return true;
    if (Array.isArray(value)) return value.length === 0;
    if ((value instanceof Set || value instanceof Map)) return value.size === 0;
		if (value instanceof FormData) {
			let keyCount = 0;
			value.forEach(() => keyCount++);

			return keyCount === 0;
		}
    return Object.keys(value).length === 0;
  }

  if (typeof value === 'string') {
    return value.length === 0;
  }

  return typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}
