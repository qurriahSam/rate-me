export interface RegisterUser {
  email: string | null;
  password: string;
}

export interface LoggedUser {
  email: string | null;
  id: string | null;
}

export interface RegisterUserStateInterface {
  isLoading: boolean;
  loggedUser: LoggedUser;
  error: null | string;
}
