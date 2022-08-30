export type User = {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  friends: string[];
  subscribers: string[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string
};


export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error',
}

export interface UserSliceState {
  userOne: User[];
  inputNumber: string;
  catergory: string;
  deleteAttention: number;
  usersAll: User[];
  status: Status;
}
