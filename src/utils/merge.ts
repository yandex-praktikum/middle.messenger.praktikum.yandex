export default function merge(arrObj: object[]): object {
  return Object.assign({}, ...arrObj);
}
