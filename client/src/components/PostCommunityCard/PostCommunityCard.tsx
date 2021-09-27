import React from "react";
import { Button } from "../shared/Button.style";
import { AboutBody, AboutCardWrapper } from "./PostCommunityCard.style";

const PostCommunityCard = () => {
  return (
    <AboutCardWrapper>
      <div className="top">
        <h3>r/programming</h3>
      </div>

      <AboutBody>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
        repudiandae recusandae laboriosam porro possimus delectus unde aliquid
        accusantium ratione iste impedit excepturi ab rerum nisi voluptatum
        animi modi dolorem mollitia.
        <div className="subscribers">
          {"4.4m"}
          <p>Subscribers</p>
        </div>
        <div className="created">
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
          Created Dec 8 2013
        </div>
        <Button sm>Join</Button>
      </AboutBody>
    </AboutCardWrapper>
  );
};

export default PostCommunityCard;
