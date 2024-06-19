export interface RegisterUser {
  email: string;
  password: string;
}

export interface RegisterUserStateInterface {
  isLoading: boolean;
  loggedUser: RegisterUser;
  error: null | string;
}
