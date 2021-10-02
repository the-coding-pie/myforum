import React from "react";
import { Post } from "../../types";
import PostCard from "../PostCard/PostCard";
import Skeleton from "react-loading-skeleton";
import NoPosts from "../NoPosts/NoPosts";
import ErrorPostCard from "../ErrorPostCard/ErrorPostCard";

interface Props {
  isLoading: boolean;
  error: any;
  posts: Post[];
}

const Posts = ({ isLoading, error, posts }: Props) => {
  if (isLoading) {
    return <Skeleton width={"100%"} height={100} count={3} />;
  }

  if (error) {
    return <ErrorPostCard error={error} />;
  }

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} {...post} />)
      ) : (
        <NoPosts msg="Oops, nothing found!" />
      )}
    </>
  );
};

export default Posts;
