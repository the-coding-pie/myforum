import React from "react";
import CommunityCard from "../../components/CommunityCard/CommunityCard";
import PostCard from "../../components/PostCard/PostCard";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";
import {
  SortDropdownSelect,
  SortDropdownWrapper,
} from "../../components/shared/SortDropdown.style";
import UserCard from "../../components/UserCard/UserCard";
import posts from "../../posts.json";

const User = () => {
  return (
    <GridLayoutWrapper>
      <div>
        <SortDropdownWrapper>
          <SortDropdownSelect>
            <option value="popular">Popular</option>
            <option value="new">New</option>
          </SortDropdownSelect>
        </SortDropdownWrapper>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} {...post} />)
        ) : (
          <p>Oops, no posts found!</p>
        )}
      </div>
      <UserCard name="TheCodingpie" username="u/thecodingpie" joined="Jan 18 2021"  />
    </GridLayoutWrapper>
  );
};

export default User;
