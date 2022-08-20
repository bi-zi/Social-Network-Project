export type UserPost = {
  _id: string;
  post: Post[];
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface Post {
  text: string;
  videoPost: string;
  imagespost: string[];
  commentPost: Comment[];
  likePost: string[];
  dislikePost: string[];
  date: string;
  _id: string;
}

interface Comment {
  fullname: string
  commentText: string
  commentDate: string
  userId: string
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error',
}

export interface UserPostSliceState {
  createText: string;
  createImg: string[];
  createVid: string;
  createComment: string;
  userPosts: {
    post: UserPost[];
    status: Status;
  };
}
