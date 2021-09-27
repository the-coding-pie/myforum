import React, { useState } from "react";
import Avatar from "react-avatar";
import useClose from "../../../hooks/useClose";
import Dropdown from "./Dropdown/Dropdown";
import { DownButtonWrapper, ProfileCardWrapper } from "./ProfileCard.style";

const ProfileCard = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  const ref = useClose(handleClose);

  return (
    <ProfileCardWrapper ref={ref} onClick={e => setIsVisible(prevValue => !prevValue)}>
      <Avatar
        style={{
          marginRight: "0.3rem",
        }}
        name="Aravind"
        size="28"
        round={true}
      />

      <span>aravind</span>

      <DownButtonWrapper>
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
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </DownButtonWrapper>

      {isVisible && <Dropdown />}
    </ProfileCardWrapper>
  );
};

export default ProfileCard;
