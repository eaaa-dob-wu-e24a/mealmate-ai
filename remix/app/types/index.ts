export type Session = {
  user: {
    _id: string;
    email: string;
    name: string;
    username: string;
    tags: string[];
    onboarded: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  token: string;
};

export type UserType = {
  _id: string;
  email: string;
  name: string;
  username: string;
  tags: string[];
  onboarded: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
