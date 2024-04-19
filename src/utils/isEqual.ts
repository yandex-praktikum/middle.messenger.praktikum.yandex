export default function isEqual(obj1: object, obj2: object): boolean {
  if (obj1 === obj2) {
    return true
  }

  if (obj1 === null || obj2 === null) {
    return obj1 === obj2
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false
    }

    const value1 = obj1[key as keyof typeof obj1]
    const value2 = obj2[key as keyof typeof obj2]

    if (typeof value1 === 'object' && typeof value2 === 'object') {
      if (!isEqual(value1, value2)) {
        return false
      }
    } else if (value1 !== value2) {
      return false
    }
  }

  return true
}
