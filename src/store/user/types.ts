export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  friends: string[];
  subscribers: string[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error',
}

export interface UserSliceState {
  usersAll: User[];
  usersPagination: [number, number, User[]];
  
  userOne: User[];
  mainUser: User;

  findUserFriends: User[];
  findUserSubscribers: User[];

  chatUsers: User[];
  commentators: User[];

  inputNumber: string;
  catergory: string;
  deleteAttention: number;
  status: Status;
}
