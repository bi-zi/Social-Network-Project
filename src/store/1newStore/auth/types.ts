export type Registration = {
  avatar: Avatar;
  birdayDate: string;
  email: string;
  firstName: string;
  friends: Friends[];
  gender: string;
  isActivated: boolean;
  lastName: string;
  login: string;
  online: boolean;
  password: string;
  subscribers: Friends[];
  wasOnline: string;
  _id: string;
};

interface Friends {
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
  mainUser: Registration | {};
}
