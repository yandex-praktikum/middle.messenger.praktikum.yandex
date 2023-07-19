import { Routes } from '../../index';

type btnAwesomeProps = {
  url: Routes;
  message?: string;
  action?: () => void;
};

export const redirect = ({ url, action = undefined }: btnAwesomeProps) => {
  if (url) window.location.href = url;
  if (action) action();
  // alert('No such route')
};

export const log = (message: string) => console.log(message);

export const findIndexByKeyValue = (arr: any[], key: string, value: unknown) =>
  arr.findIndex((obj) => obj[key] === value);

export const parseDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
};

export const setStyles = (el: HTMLElement, attrs: Record<string, string>) => {
  const style = Object.entries(attrs)
    .map((a) => `${a[0]}: ${a[1]};`)
    .join(' ');
  el.setAttribute('style', style);
};

export const warningStyles = {
  pending: {
    display: 'none',
  },
  valid: {
    display: 'inline-block',
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    border: '1px solid green',
  },
  invalid: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    border: '1px solid red',
  },
};

export type Indexed<T = any> = {
  [key in string]: T;
};

// export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
//   for (const p of Object.keys(rhs)) {
//     if (!rhs.hasOwnProperty(p)) {
//       continue;
//     }

//     try {
//       if (rhs[p].constructor === Object) {
//         rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
//       } else {
//         lhs[p] = rhs[p];
//       }
//     } catch (e) {
//       lhs[p] = rhs[p];
//     }
//   }

//   return lhs;
// };

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  Object.entries(rhs).forEach(([p, value]) => {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      try {
        if (value.constructor === Object) {
          lhs[p] = merge(lhs[p] as Indexed, value as Indexed);
        } else {
          lhs[p] = value;
        }
      } catch (e) {
        lhs[p] = value;
      }
    }
  });

  return lhs;
};

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  return merge(object as Indexed, result);
}

export function isEqual(aa: object, bb: object): boolean {
  const a = JSON.parse(JSON.stringify(aa));
  const b = JSON.parse(JSON.stringify(bb));
  if (a instanceof SyntaxError || b instanceof SyntaxError) {
    alert("Couldn't update page");
    return false;
  }

  if (a === b) return true;

  if (
    typeof a === 'function' &&
    typeof b === 'function' &&
    a.toString() === b.toString()
  ) {
    return true;
  }

  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false;
  }

  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);

  if (keys1.length !== keys2.length) return false;
  const areObjectsEqual = keys1.every((key) => {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    const obj1 = (a as any)[key] as object;
    const obj2 = (b as any)[key] as object;
    return isEqual(obj1, obj2);
  });

  if (!areObjectsEqual) {
    // If any object property is not equal, return false
    return false;
  }

  return true;
}

export function arrayLeftRightIntersect(
  arr1: number[],
  arr2: number[]
): [number[], number[], number[]] {
  const leftOnly: number[] = [];
  const rightOnly: number[] = [];
  const intersection: number[] = [];

  // Find elements only in the left array
  // for (const element of arr1) {
  //   if (!arr2.includes(element)) {
  //     leftOnly.push(element);
  //   }
  // }

  arr1.filter((element) => !arr2.includes(element));

  // Find elements only in the right array
  // for (const element of arr2) {
  //   if (!arr1.includes(element)) {
  //     rightOnly.push(element);
  //   } else {
  //     // Find intersection elements
  //     if (!intersection.includes(element)) {
  //       intersection.push(element);
  //     }
  //   }
  // }
  arr2.forEach((element) => {
    if (!arr1.includes(element)) {
      rightOnly.push(element);
    } else if (!intersection.includes(element)) {
      intersection.push(element);
    }
  });

  return [leftOnly, rightOnly, intersection];
}

export const cloneDeep = (value: unknown): any => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => cloneDeep(item));
  }

  if (value instanceof Map) {
    const clonedMap = new Map();
    value.forEach((innerValue, key) => {
      clonedMap.set(key, cloneDeep(innerValue));
    });
    return clonedMap;
  }

  if (value instanceof Set) {
    const clonedSet = new Set();
    value.forEach((innerValue) => {
      clonedSet.add(cloneDeep(innerValue));
    });
    return clonedSet;
  }

  if (typeof value === 'function') {
    return value;
  }

  const clonedObj: any = {};
  // for (const key in value) {
  //   if (value.hasOwnProperty(key)) {
  //     clonedObj[key] = cloneDeep(value[key]);
  //   }
  // }
  Object.keys(value).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clonedObj[key] = cloneDeep(value[key]);
    }
  });
  return clonedObj;
};

export const formDataToObject = (formData: FormData): Record<string, any> => {
  const obj: Record<string, any> = {};

  formData.forEach((value, key) => {
    // If the value is a File object, keep it as is
    if (value instanceof File) {
      obj[key] = value;
    } else {
      // Convert other values to strings
      obj[key] = value.toString();
    }
  });

  return obj;
};

export const clearFormInputs = (form: HTMLFormElement) => {
  const { elements } = form;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.value = '';
    } else if (element.tagName === 'SELECT') {
      element.selectedIndex = 0;
    }
  }
};

export const queryStringify = (data: Record<string, any>): string | never => {
  if (typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Input must be an object');
  }

  const queryStrings: string[] = [];

  // function processValue(key: string, value: unknown) {
  //   if (Array.isArray(value)) {
  //     value.forEach((item, index) => processValue(`${key}[${index}]`, item));
  //   } else if (typeof value === 'object') {
  //     for (const innerKey in value) {
  //       if (value.hasOwnProperty(innerKey)) {
  //         processValue(`${key}[${innerKey}]`, value[innerKey]);
  //       }
  //     }
  //   } else {
  //     queryStrings.push(`${key}=${value}`);
  //   }
  // }
  function processValue(key: string, value: unknown) {
    const stack: { key: string; value: unknown }[] = [{ key, value }];

    while (stack.length > 0) {
      const { key: currentKey, value: currentValue } = stack.pop()!;

      if (Array.isArray(currentValue)) {
        currentValue.forEach((item, index) => {
          stack.push({ key: `${currentKey}[${index}]`, value: item });
        });
      } else if (typeof currentValue === 'object' && currentValue !== null) {
        Object.entries(currentValue).forEach(([innerKey, innerValue]) => {
          stack.push({ key: `${currentKey}[${innerKey}]`, value: innerValue });
        });
      } else {
        queryStrings.push(`${currentKey}=${currentValue}`);
      }
    }
  }

  Object.entries(data).forEach(([key, value]) => {
    processValue(key, value);
  });

  return queryStrings.join('&');
};

// export const formDataToJson = (formData: FormData):
// Record<string, string | number | undefined> => {
//   const json: { [key: string]: any } = {}

//   for (const [key, value] of formData.entries()) {
//     json[key] = value
//   }

//   return json
// }

export const formDataToJson = (
  formData: FormData
): Record<string, string | number | undefined> => {
  const json: { [key: string]: any } = {};

  formData.forEach((value, key) => {
    json[key] = value;
  });

  return json;
};
