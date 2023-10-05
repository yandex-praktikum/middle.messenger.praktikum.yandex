export default function isPlainObject(structure: any): boolean {
  if (
    structure !== null &&
    typeof structure === 'object' &&
    structure.toString() === '[object Object]'
  ) {
    return true;
  }

  return false;
}
