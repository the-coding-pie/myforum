import React from "react";
import { Link } from "react-router-dom";
import { CommunityObj } from "../../types";
import { CommunityItem } from "../CommunityCard/CommunityCard.style";

interface Props {
  isLoading: boolean;
  error: any;
  communities: CommunityObj[];
}

const Communities = ({ isLoading, error, communities }: Props) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }
  return (
    <>
      {communities.length > 0 &&
        communities.map((c, index) => (
          <CommunityItem key={c._id}>
            <Link to={`/c/${c.name}`}>
              <span className="ranking">{index + 1}</span>

              <span className="name">c/{c.name}</span>
            </Link>
          </CommunityItem>
        ))}
    </>
  );
};

export default Communities;
