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
  postedAt: string;
  votes: string;
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
