export interface RegisterUser {
  email: string | null;
  password: string;
  username: string;
}

export interface LoginUser {
  email: string | null;
  password: string;
}

export interface User {
  email: string | null;
  id: string | null;
}

export interface UserStateInterface {
  isLoading: boolean;
  loggedUser: User;
  error: null | string;
}
