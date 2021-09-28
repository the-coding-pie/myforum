import React from "react";
import {
  SortDropdownSelect,
  SortDropdownWrapper,
} from "../../components/shared/SortDropdown.style";
import useQuery from "../../hooks/useQuery";
import { SearchBanner } from "./Search.style";
import posts from "../../posts.json";
import PostCard from "../../components/PostCard/PostCard";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";

const Search = () => {
  const query = useQuery();
  const q = query.get("q");

  return (
    <div>
      <SearchBanner>Search Results</SearchBanner>
      <GridLayoutWrapper>
        {q && q !== "" ? (
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
        ) : (
          "Oops, nothing found!"
        )}
      </GridLayoutWrapper>
    </div>
  );
};

export default Search;
