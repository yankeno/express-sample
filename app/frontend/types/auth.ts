export type AuthState = {
  token: string | null;
  user: {
    id: number;
    email: string;
  } | null;
  loggedIn: boolean;
};
