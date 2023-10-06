interface SigninFormModel {
  login: string;
  password: string;
}

interface SignupFormModel {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export type { SigninFormModel, SignupFormModel };
