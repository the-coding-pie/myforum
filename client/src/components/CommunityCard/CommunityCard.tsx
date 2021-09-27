import React from "react";
import {
  CommunityCardWrapper,
  CommunityItem,
  CommunityList,
} from "./CommunityCard.style";
import communities from "../../communities.json";
import { Link } from "react-router-dom";

const CommunityCard = () => {
  return (
    <CommunityCardWrapper>
      <div className="top">
        <h3>Top Communities</h3>
      </div>
      <CommunityList>
        {communities.length > 0 &&
          communities.map((c, index) => (
            <CommunityItem key={c.id}>
              <Link to={`/${c.name}`}>
                <span className="ranking">{index + 1}</span>

                <span className="name">{c.name}</span>
              </Link>
            </CommunityItem>
          ))}
      </CommunityList>
    </CommunityCardWrapper>
  );
};

export default CommunityCard;
