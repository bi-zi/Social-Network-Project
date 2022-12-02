export type FormValues = {
  login: string;
  firstName: string;
  lastName: string;
  gender: string;
  birdayDate: Date;
  email: string;
  password: string;
};

export type BackendData = {
  email: string;
  password: string;
  user: User;
  data: Data;
};

export type Error = {
  status: number;
  data: {
    errors: [];
    message: string;
  };
};

interface Data {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface User {
  login: string;
  email: string;
  isActivated: boolean;
  _id: string;
}
