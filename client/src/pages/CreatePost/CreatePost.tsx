import React from "react";
import CreatePostBox from "../../components/CreatePostBox/CreatePostBox";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";

const CreatePost = () => {
  return (
    <GridLayoutWrapper>
      <CreatePostBox />
    </GridLayoutWrapper>
  );
};

export default CreatePost;
