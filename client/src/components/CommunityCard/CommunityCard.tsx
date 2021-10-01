import React from "react";
import {
  CommunityCardWrapper,
  CommunityList,
} from "./CommunityCard.style";
import axios from "axios";
import { BASE_URL } from "../../types/constants";
import { useQuery } from "react-query";
import Communities from "../Communities/Communities";

const CommunityCard = () => {
  const getCommunities = async () => {
    const res = await axios.get(`${BASE_URL}/communities`);

    return res.data.data.communities;
  };

  const {
    data: communities,
    isLoading,
    error,
  } = useQuery([`communities`], getCommunities);

  return (
    <CommunityCardWrapper>
      <div className="top">
        <h3>Top Communities</h3>
      </div>
      <CommunityList>
        <Communities {...{ communities, isLoading, error }} />
      </CommunityList>
    </CommunityCardWrapper>
  );
};

export default CommunityCard;
