export function classNames(main, options) {
  const classes = Object.keys(options).reduce((acc, key) => {
    if (options[key]) {
      acc.push(key);
    }

    return acc;
  }, [main]);

  return classes.join(' ');
}
