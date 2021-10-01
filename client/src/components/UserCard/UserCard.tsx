import React from "react";
import { UserDetailObj } from "../../types";
import { getDate, getMDY } from "../../utils/helpers";
import { Button } from "../shared/Button.style";
import { UserBody, UserCardWrapper } from "./UserCard.style";

interface Props {
  isLoading: boolean;
  error: any;
  user: UserDetailObj;
}

const UserCard = ({ isLoading, error, user }: Props) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <UserCardWrapper>
      <div className="top">
        <h3>u/{user.username}</h3>
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
          {user.joinedAt && getMDY(user.joinedAt)}
        </div>
      </UserBody>
    </UserCardWrapper>
  );
};

export default UserCard;
