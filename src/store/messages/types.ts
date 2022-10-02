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
  userMessages: Messages[];
  data2: Messages[];
  selectedUser: string;
  addMessages: number;
  findChat: string;
  sortedChats: Messages[];
  status: Status;
}
