export type Registration = {
  login: string;
  firstName: string;
  lastName: string;
  gender: string;
  birdayDate: Date;
  email: string;
  password: string;
  user: User;
  _id: string;
};


export type Login = {
  email: string;
  password: string;
  user: User;
  data: Data;
};

interface Data {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type User = {
  login: string;
  email: string;
  isActivated: boolean;
  _id: string;
}

export type Error = {
  status: number;
  data: {
    errors: [];
    message: string;
  };
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error',
}

export interface AuthSliceState {
  authorizedUser: User;
  error: any;
}
