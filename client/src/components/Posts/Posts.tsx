import React from "react";
import { Post } from "../../types";
import PostCard from "../PostCard/PostCard";

interface Props {
  isLoading: boolean;
  error: any;
  posts: Post[];
}

const Posts = ({ isLoading, error, posts }: Props) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} {...post} />)
      ) : (
        <p>Oops, no posts found!</p>
      )}
    </>
  );
};

export default Posts;
