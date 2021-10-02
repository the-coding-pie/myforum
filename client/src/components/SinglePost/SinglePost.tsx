import React from "react";
import Skeleton from "react-loading-skeleton";
import { Post } from "../../types";
import ErrorPostCard from "../ErrorPostCard/ErrorPostCard";
import PostCard from "../PostCard/PostCard";

interface Props {
  isLoading: boolean;
  error: any;
  post: Post;
}

const SinglePost = ({ isLoading, error, post }: Props) => {
  if (isLoading) {
    return <Skeleton width={"100%"} height={100} count={1} />;
  }

  if (error) {
    return <ErrorPostCard error={error} />;
  }

  return (
    <>
      <PostCard {...post} />
    </>
  );
};

export default SinglePost;
