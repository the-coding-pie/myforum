import React from "react";
import { Post } from "../../types";
import PostCard from "../PostCard/PostCard";

interface Props {
  isLoading: boolean;
  error: any;
  post: Post;
}

const SinglePost = ({ isLoading, error, post }: Props) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <>
      <PostCard {...post} />
    </>
  );
};

export default SinglePost;
