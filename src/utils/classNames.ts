export function classNames(main: string, options: Record<string, unknown>): string {
  const classes = Object.keys(options).reduce((acc, key) => {
    if (options[key]) {
      acc.push(key);
    }

    return acc;
  }, [main]);

  return classes.join(' ');
}
