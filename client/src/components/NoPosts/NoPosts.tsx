import React from "react";
import { NoPostsWrapper } from "./NoPosts.style";

interface Props {
  msg: string;
}

const NoPosts = ({ msg }: Props) => {
  return <NoPostsWrapper>{msg}</NoPostsWrapper>;
};

export default NoPosts;
