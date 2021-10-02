import React, { useState } from "react";
import {
  SortDropdownSelect,
  SortDropdownWrapper,
} from "../../components/shared/SortDropdown.style";
import { useQuery } from "react-query";
import { SearchBanner } from "./Search.style";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";
import { BASE_URL, SortOptions } from "../../types/constants";
import axios from "axios";
import Posts from "../../components/Posts/Posts";
import { useLocation } from "react-router";

const Search = () => {
  const query = new URLSearchParams(useLocation().search);
  const q = query.get("q");

  const [currentSort, setCurrentSort] = useState(SortOptions[0]);

  const searchPosts = async ({ queryKey }: { queryKey: string[] }) => {
    const res = await axios.get(
      `${BASE_URL}/search?q=${queryKey[1]}&sortBy=${queryKey[2]}`
    );

    return res.data.data.posts;
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery([`search`, q as string, currentSort as string], searchPosts);

  return (
    <div>
      <SearchBanner>Search Results</SearchBanner>
      <GridLayoutWrapper>
        {q && q !== "" ? (
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
        ) : (
          "Oops, nothing found!"
        )}
      </GridLayoutWrapper>
    </div>
  );
};

export default Search;
