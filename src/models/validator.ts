export type ValidatorError = { error: string };
export type ValidatorFn = (value: string) => boolean | ValidatorError;
