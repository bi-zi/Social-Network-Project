import { Registration } from './../../../Pages/Registration-Login/copyReg';
export type Registration = {
  email: string
  password: string
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error',
}

export interface AuthSliceState {
  status: '';
}
