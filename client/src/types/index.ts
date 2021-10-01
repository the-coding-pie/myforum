import { DEFAULT, ERROR, INFO, SUCCESS, WARNING } from "./constants";

export interface UserObj {
  id: number;
  username: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  community: {
    name: string;
  };
  author: {
    username: string;
  };
  comments: number;
  postedAt: string;
  votes: number;
}

// toast
export interface ToastObj {
  kind:
    | typeof ERROR
    | typeof SUCCESS
    | typeof INFO
    | typeof WARNING
    | typeof DEFAULT;
  msg: string;
}

// community obj
export interface CommunityObj {
  _id: string;
  name: string;
}

export interface CommunityDetailObj {
  _id: string;
  cname: string;
  about: string;
  admin: {
    _id: string;
    username: string;
  };
  subscribers: number;
  createdAt: string;
}
