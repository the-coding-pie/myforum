import React from "react";
import { Link } from "react-router-dom";
import { CommentCardTop, CommentCardWrapper } from "./CommentCard.style";

interface Props {
  username: string;
  datePosted: string;
  comment: string;
}

const CommentCard = ({ username, datePosted, comment }: Props) => {
  return (
    <CommentCardWrapper>
      <CommentCardTop>
        <Link to={`/${username}`}>{username}</Link>
        <time>{datePosted}</time>
      </CommentCardTop>
      <p>{comment}</p>
    </CommentCardWrapper>
  );
};

export default CommentCard;
