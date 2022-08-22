export type About = {
  _id?: string;
  livesIn: string;
  from: string;
  bornOn: string;
  profession: string;
  relations: string;
  studentAt: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error',
}

export interface AboutSliceState {
  data: About[];
  status: Status;
}
