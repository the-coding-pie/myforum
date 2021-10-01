import React, { useState } from "react";
import { useParams } from "react-router";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";
import {
  SortDropdownSelect,
  SortDropdownWrapper,
} from "../../components/shared/SortDropdown.style";
import {
  CommunityBanner,
  CommunityLeft,
  CommunityRight,
} from "./Community.style";
import { Button } from "../../components/shared/Button.style";
import AboutCard from "../../components/AboutCard/AboutCard";
import { BASE_URL, SortOptions } from "../../types/constants";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Posts from "../../components/Posts/Posts";

const Community = () => {
  const { name } = useParams<{ name: string }>();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const [currentSort, setCurrentSort] = useState(SortOptions[0]);

  const headers = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};

  const getCommunityPosts = async ({ queryKey }: { queryKey: string[] }) => {
    const res = await axios.get(
      `${BASE_URL}/posts?sortBy=${queryKey[1]}&comm=${name}`,
      {
        headers,
      }
    );

    return res.data.data.posts;
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(
    [`getPost?sortBy=${currentSort}&comm=${name}`, currentSort],
    getCommunityPosts
  );

  return (
    <div>
      <CommunityBanner>
        <CommunityLeft>
          <h3>{name.toUpperCase()}</h3>
          <span>c/{name}</span>
        </CommunityLeft>
        {posts && (
          <CommunityRight>
            <Button>Join</Button>
          </CommunityRight>
        )}
      </CommunityBanner>
      <GridLayoutWrapper>
        <div>
          <SortDropdownWrapper>
            <SortDropdownSelect
              disabled={!posts}
              onChange={(e) => setCurrentSort(e.target.value)}
            >
              {SortOptions.map((s) => (
                <option value={s}>{s}</option>
              ))}
            </SortDropdownSelect>
          </SortDropdownWrapper>
          <Posts {...{ isLoading, error, posts }} />
        </div>

        <AboutCard {...{ name }} />
      </GridLayoutWrapper>
    </div>
  );
};

export default Community;
