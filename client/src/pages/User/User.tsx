import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import CommunityCard from "../../components/CommunityCard/CommunityCard";
import PostCard from "../../components/PostCard/PostCard";
import Posts from "../../components/Posts/Posts";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";
import {
  SortDropdownSelect,
  SortDropdownWrapper,
} from "../../components/shared/SortDropdown.style";
import UserCard from "../../components/UserCard/UserCard";
import posts from "../../posts.json";
import { BASE_URL, SortOptions } from "../../types/constants";

const User = () => {
  const { username } = useParams<{ username: string }>();
  const [currentSort, setCurrentSort] = useState(SortOptions[0]);

  const getUsersPosts = async ({ queryKey }: { queryKey: string[] }) => {
    const res = await axios.get(
      `${BASE_URL}/users/${username}/posts?sortBy=${queryKey[1]}`
    );

    return res.data.data.posts;
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(
    [`getUsersPosts?sortBy=${currentSort}`, currentSort],
    getUsersPosts
  );

  return (
    <GridLayoutWrapper>
      <div>
        <SortDropdownWrapper>
          <SortDropdownSelect
            disabled={!posts || posts.length <= 0}
            onChange={(e) => setCurrentSort(e.target.value)}
          >
            {SortOptions.map((s) => (
              <option value={s}>{s}</option>
            ))}
          </SortDropdownSelect>
        </SortDropdownWrapper>
        <Posts {...{ isLoading, error, posts }} />
      </div>
      <UserCard username={username} />
    </GridLayoutWrapper>
  );
};

export default User;
