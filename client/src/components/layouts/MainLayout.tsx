import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import DefaultLayout from "./DefaultLayout";

const MainLayout = () => {
  // this layout is just for deciding whether to show admin panel or normal screen

  // get user
  const { user } = useSelector((state: RootState) => state.auth);

  const getCurrentUser = () => {
    console.log("Getting Current User");
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  //   if (user && user !== {}) {
  //     return <DefaultLayout />;
  //   }

  //   return <div>Loading</div>;
  return <DefaultLayout />;
};

export default MainLayout;
