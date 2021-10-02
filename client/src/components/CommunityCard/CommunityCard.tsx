import React from "react";
import {
  CommunityCardBody,
  CommunityCardWrapper,
  CommunityItem,
  CommunityList,
} from "./CommunityCard.style";
import axios from "axios";
import { BASE_URL } from "../../types/constants";
import { useQuery } from "react-query";
import { CommunityObj } from "../../types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

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
    return (
      <CommunityCardWrapper>
        <div className="top">
          <h3>Top Communities</h3>
        </div>
        <CommunityList>
          <Skeleton height={46} count={5} />
        </CommunityList>
      </CommunityCardWrapper>
    );
  }

  if (error) {
    let text = "";

    switch (error.response.status) {
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
      <CommunityCardWrapper>
        <div className="top">
          <h3>Top Communities</h3>
        </div>
        <CommunityCardBody>
          <div
            className="error-side-box"
            style={{
              color: "#be2a2a",
              textAlign: "center",
            }}
          >
            {text}
          </div>
        </CommunityCardBody>
      </CommunityCardWrapper>
    );
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
