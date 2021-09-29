import { DEFAULT, ERROR, INFO, SUCCESS, WARNING } from "./constants";

export interface UserObj {
  id: number;
  username: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  comments: number;
  community: string;
  user: string;
  datePosted: string;
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