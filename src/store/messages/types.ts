
export type Messages = {
  _id: string;
  correspondence: UserCorrespondence[];
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface UserCorrespondence {
  messages: UserMessage[];
  withWho: string;
}

interface UserMessage {
  message: string;
  date: string;
  userId: string;
  withWho: string;
}


export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error',
}

export interface MessagesSliceState {
  data: Messages[];
  data2: Messages[];
  sortedId: string;
  status: Status;
}
