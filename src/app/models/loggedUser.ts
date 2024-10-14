export interface RegisterUser {
  email: string | null;
  password: string;
}

export interface User {
  email: string | null;
  id: string | null;
}

export interface RegisterUserStateInterface {
  isLoading: boolean;
  loggedUser: User;
  error: null | string;
}
