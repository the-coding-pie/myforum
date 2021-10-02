import axios from "axios";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { CommentObj } from "../../types";
import { BASE_URL } from "../../types/constants";
import CommentCard from "../CommentCard/CommentCard";
import ErrorPostCard from "../ErrorPostCard/ErrorPostCard";
import NoPosts from "../NoPosts/NoPosts";

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
    return <Skeleton width={"100%"} style={{
      marginTop: "1rem"
    }} height={68} count={3} />;
  }

  if (error) {
    return <ErrorPostCard error={error} />;
  }

  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment._id} {...comment} postId={id} />
        ))
      ) : (
        <NoPosts msg="No Comments yet!" />
      )}
    </>
  );
};

export default Comments;
