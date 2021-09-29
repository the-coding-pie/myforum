import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import { BASE_URL, ERROR } from "../../../types/constants";
import { logoutUser, setCurrentUser } from "../../../features/authSlice";
import { addToast } from "../../../features/toastSlice";

const MainLayout = () => {
  // this layout is just for deciding whether to show admin panel or normal screen, if exists

  const dispatch = useDispatch();

  // get user
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

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
            // the try to get new access token failed due to invalid refresh token
            case 401:
              dispatch(logoutUser());
              break;
            default:
              dispatch(
                addToast({
                  kind: ERROR,
                  msg: "Oops, something went wrong! Try reload...",
                })
              );
              break;
          }
        } catch (e) {
          dispatch(
            addToast({
              kind: ERROR,
              msg: "Oops, something went wrong!",
            })
          );
        }
      });
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
