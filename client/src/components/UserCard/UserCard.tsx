import axios from "axios";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { UserDetailObj } from "../../types";
import { BASE_URL } from "../../types/constants";
import { getMDY } from "../../utils/helpers";
import { UserBody, UserCardWrapper } from "./UserCard.style";

interface Props {
  username: string;
}

const UserCard = ({ username }: Props) => {
  const getThisUser = async () => {
    const res = await axios.get(`${BASE_URL}/users/${username}`);

    return res.data.data;
  };

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<UserDetailObj, any>([`getUser/${username}`], getThisUser);

  if (isLoading) {
    return (
      <UserCardWrapper>
        <div className="top">
          <h3>u/___</h3>
        </div>
        <Skeleton height="70px" />
      </UserCardWrapper>
    );
  }

  if (error) {
    let text = "";

    switch (error?.response?.status) {
      case 400:
        text = "Bad Request: 400";
        break;
      case 404:
        text = "Resource Not Found: 404";
        break;
      default:
        text = "Oops, something went wrong";
    }

    return (
      <UserCardWrapper>
        <div className="top">
          <h3>u/___</h3>
        </div>
        <UserBody>
          <div
            className="error-side-box"
            style={{
              color: "#be2a2a",
              textAlign: "center",
            }}
          >
            {text}
          </div>
        </UserBody>
      </UserCardWrapper>
    );
  }

  return (
    <UserCardWrapper>
      <div className="top">
        <h3>u/{user?.username}</h3>
      </div>

      <UserBody>
        <p>Joined</p>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
            />
          </svg>
          {user?.joinedAt && getMDY(user.joinedAt)}
        </div>
      </UserBody>
    </UserCardWrapper>
  );
};

export default UserCard;
