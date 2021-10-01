import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { CommentObj, Post } from "../../types";
import { BASE_URL } from "../../types/constants";
import CommentCard from "../CommentCard/CommentCard";
import PostCard from "../PostCard/PostCard";

interface Props {
  id: string;
}

const Comments = ({ id }: Props) => {
  const getComments = async () => {
    const res = await axios.get(`${BASE_URL}/posts/${id}/comments`);

    return res.data.data.comments;
  };

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<CommentObj[], any>(`getComments/${id}`, getComments);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment._id} {...comment} postId={id} />
        ))
      ) : (
        <p>No comments yet!</p>
      )}
    </>
  );
};

export default Comments;
