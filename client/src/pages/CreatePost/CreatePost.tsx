import React from "react";
import CreatePostBox from "../../components/CreatePostBox/CreatePostBox";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";
import UserCard from "../../components/UserCard/UserCard";

const CreatePost = () => {
  return (
    <GridLayoutWrapper>
      <CreatePostBox />
      <UserCard
        name="TheCodingpie"
        username="u/thecodingpie"
        joined="Jan 18 2021"
      />
    </GridLayoutWrapper>
  );
};

export default CreatePost;
