export type FriendsPageUser = {
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
  users: [number, number, FriendsPageUser[]];
  sortedUsers: FriendsPageUser[];
  categorySort: string;
  sortBy: string;
  status: Status;
}
