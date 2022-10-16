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
  mainUserMessages: Messages[];
  secondUserMessages: Messages[];

  selectedUser: string;
  addMessages: number;
  findChat: string;
  sortedChats: Messages[];
  status: Status;
}
