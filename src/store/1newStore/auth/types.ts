import { Registration } from './../../../Pages/Registration-Login/Registration';
export type Registration = {
  email: string;
  isActivated: boolean;
  login: string;
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
  authorizedUser: Registration;
}
