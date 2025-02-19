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

export type Recipe = {
  _id: string;
  title: string;
  image: string;
  categories: string[];
  preparation: {
    total_time: string;
    prep_time: string;
    cook_time: string;
  };
  ingredients: {
    name: string;
    quantity: {
      amount: number;
      unit: string;
    };
  }[];
  instructions: string[];
  servings: number;
};
