import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import { BASE_URL, ERROR } from "../../../types/constants";
import { setCurrentUser } from "../../../features/authSlice";
import { addToast } from "../../../features/toastSlice";
import { v4 as uuidv4 } from "uuid";

const MainLayout = () => {
  // this layout is just for deciding whether to show admin panel or normal screen, if exists
  // you can put this directly inside the DefaultLayout
  const dispatch = useDispatch();

  // get user
  const { accessToken, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );

  const getCurrentUser = () => {
    axios
      .get(`${BASE_URL}/auth/getUser`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const data = response.data.data;

        dispatch(setCurrentUser(data));
      })
      .catch(({ response }) => {
        try {
          switch (response.status) {
            default:
              dispatch(
                addToast({
                  id: uuidv4(),
                  kind: ERROR,
                  msg: "Oops, something went wrong!",
                })
              );
              break;
          }
        } catch (e) {
          dispatch(
            addToast({
              id: uuidv4(),
              kind: ERROR,
              msg: "Oops, something went wrong!",
            })
          );
        }
      });
  };

  useEffect(() => {
    if (refreshToken || accessToken) {
      getCurrentUser();
    }
  }, []);

  return <DefaultLayout />;
};

export default MainLayout;
