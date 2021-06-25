export interface User {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface Login {
  user: User;
  token: string;
}
