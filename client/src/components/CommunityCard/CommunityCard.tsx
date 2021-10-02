import React from "react";
import { CommunityCardWrapper, CommunityItem, CommunityList } from "./CommunityCard.style";
import axios from "axios";
import { BASE_URL } from "../../types/constants";
import { useQuery } from "react-query";
import { CommunityObj } from "../../types";
import { Link } from "react-router-dom";

const CommunityCard = () => {
  const getCommunities = async () => {
    const res = await axios.get(`${BASE_URL}/communities`);

    return res.data.data.communities;
  };

  const {
    data: communities,
    isLoading,
    error,
  } = useQuery<CommunityObj[], any>([`communities`], getCommunities);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <CommunityCardWrapper>
      <div className="top">
        <h3>Top Communities</h3>
      </div>
      <CommunityList>
        {communities &&
          communities.length > 0 &&
          communities.map((c, index) => (
            <CommunityItem key={c._id}>
              <Link to={`/c/${c.name}`}>
                <span className="ranking">{index + 1}</span>

                <span className="name">c/{c.name}</span>
              </Link>
            </CommunityItem>
          ))}
      </CommunityList>
    </CommunityCardWrapper>
  );
};

export default CommunityCard;
