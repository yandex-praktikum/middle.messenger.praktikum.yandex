type SignupResponse = {
  id: number;
};

type LoginRequest = {
  login: string;
  password: string;
};

type SignupRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type { SignupResponse, LoginRequest, SignupRequest };
