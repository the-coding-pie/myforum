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
