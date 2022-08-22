export type User = {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  friends: string[];
  subscribers: string[];
  imageUrl: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type FormValues = {
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
