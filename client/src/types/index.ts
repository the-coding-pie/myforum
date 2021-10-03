import { DEFAULT, ERROR, INFO, SUCCESS, WARNING } from "./constants";

export interface UserObj {
  _id: string;
  username: string;
}

export interface UserDetailObj {
  _id: string;
  username: string;
  joinedAt: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  kind: "text" | "link";
  community: {
    _id: string;
    name: string;
  };
  upVoters: [{ _id: string }];
  downVoters: [{ _id: string }];
  author: {
    _id: string;
    username: string;
  };
  comments: number;
  postedAt: string;
  votes: number;
}

// toast
export interface ToastObj {
  id: string;
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
  subscribers: { _id: string }[];
  subscribersCount: number;
  createdAt: string;
}

export interface CommentObj {
  _id: string;
  comment: string;
  commentator: {
    _id: string;
    username: string;
  };
  postedAt: string;
}
