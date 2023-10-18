export default function trim(str: string, pattern = '\\s'): string {
  const regExp = new RegExp(`[${pattern}]`, 'gi');

  return str.replace(regExp, '');
}
