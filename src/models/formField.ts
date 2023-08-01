import { ValidatorFn } from './validator';

export type FieldType = 'text' | 'password';

export interface FormField<T = string> {
  name: string;
  label: string;
  type?: FieldType;
  value: T;
	disabled?: boolean;
  validators?: ValidatorFn[];
}
