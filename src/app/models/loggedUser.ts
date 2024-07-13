export interface RegisterUser {
  email: string | null;
  password: string;
}

export interface RegisterUserStateInterface {
  isLoading: boolean;
  loggedUser: RegisterUser;
  error: null | string;
}
