import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { RootState } from "../../app/store";
import CreatePostBox from "../../components/CreatePostBox/CreatePostBox";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";

const CreatePost = () => {
  const { accessToken, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );

  if (!accessToken && !refreshToken) {
    return <Redirect to="/" />;
  }

  return (
    <GridLayoutWrapper>
      <CreatePostBox />
    </GridLayoutWrapper>
  );
};

export default CreatePost;
