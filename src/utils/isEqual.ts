type PlainObject<T = unknown> = {
	[k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
	return typeof value === 'object'
		&& value !== null
		&& value.constructor === Object
		&& Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
	return isPlainObject(value) || isArray(value);
}

export function isEqual(obj1: unknown, obj2: unknown): boolean {
	if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) {
		return obj1 === obj2;
	}

	if (Object.keys(obj1).length !== Object.keys(obj2).length) {
		return false;
	}

	for (const [key, value] of Object.entries(obj1)) {
		const rightValue = (obj2 as PlainObject)[key];

		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			if (isEqual(value, rightValue)) {
				continue;
			}
			return false;
		}

		if (value !== rightValue) {
			return false;
		}
	}

	return true;
}
