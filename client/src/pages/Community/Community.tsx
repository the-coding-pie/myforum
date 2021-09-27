import React from "react";
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
import posts from "../../posts.json";
import PostCard from "../../components/PostCard/PostCard";
import { Button } from "../../components/shared/Button.style";
import AboutCard from "../../components/AboutCard/AboutCard";

const Community = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>
      <CommunityBanner>
        <CommunityLeft>
          <h3>{name.toUpperCase()}</h3>
          <span>c/{name}</span>
        </CommunityLeft>
        <CommunityRight>
          <Button>Join</Button>
        </CommunityRight>
      </CommunityBanner>
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

        <AboutCard about="lowaerjsadf asdfsafasdfasdfasdf" subscribers="44.4m" creatdAt="22 June 2021" />
      </GridLayoutWrapper>
    </div>
  );
};

export default Community;
