export function classNames(main: string, options: Record<string, boolean>): string {
  const classes = Object.keys(options).reduce((acc, key) => {
    if (options[key]) {
      acc.push(key);
    }

    return acc;
  }, [main]);

  return classes.join(' ');
}
