type TObject = Record<string, any>;

function isEqual(object1: TObject, object2: TObject): boolean {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);

  if (props1.length !== props2.length) {
    return false;
  }

  for (let i = 0; i < props1.length; i += 1) {
    const prop = props1[i];

    if (object1[prop] !== object2[prop]) {
      return false;
    }
  }

  return true;
}

export { isEqual };
