export type User = {
  _id: string;
  email: string;
  passwordHash: string;
  friends: string[];
  subscribers: string[];
  imageUrl: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error',
}

export interface UserSliceState {
  userOne: {};
  inputNumber: string;
  catergory: string;
  usersAll: User[];
  status: Status;
}
