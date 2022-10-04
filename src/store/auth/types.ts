export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  friends: string[];
  subscribers: string[];
  imageUrl: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type FormValuesLogin = {
  email: string;
  password: string;
};


export type FormValuesRegistr = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error',
}

export interface AuthSliceState {
  data: User;
  status: Status;
}
