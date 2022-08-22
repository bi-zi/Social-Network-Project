export type Note = {
  _id: string;
  friendRequest: Request[];
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface Request {
  fromWho: string
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error',
}

export interface NoteSliceState {
  notifications: Note;
  status: Status;
}
