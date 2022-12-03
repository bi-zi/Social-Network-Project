export type MainUser = {
  _id: string;
  login: string;
  firstName: string;
  lastName: string;
  gender: string;
  birdayDate: string;
  email: string;
  password: string;
  friends: FriendsSubscribers[];
  subscribers: FriendsSubscribers[];
  avatar: Avatar;
  wasOnline: string;
  online: boolean;
  isActivated: boolean;
  activationLink: string;
};

interface FriendsSubscribers {
  user: string;
  _id: string;
}

interface Avatar {
  image: string;
  sizeUpTo: string;
  sizeAfter: string;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error',
}

export interface UserSliceState {
  user: MainUser;
}
