import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import CommunityCard from "../../components/CommunityCard/CommunityCard";
import Posts from "../../components/Posts/Posts";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";
import {
  SortDropdownSelect,
  SortDropdownWrapper,
} from "../../components/shared/SortDropdown.style";
import { BASE_URL, SortOptions } from "../../types/constants";

const Home = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const [currentSort, setCurrentSort] = useState(SortOptions[0]);

  const headers = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};

  const getPosts = async ({ queryKey }: { queryKey: string[] }) => {
    const res = await axios.get(`${BASE_URL}/posts?sortBy=${queryKey[1]}`, {
      headers,
    });

    return res.data.data.posts;
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery([`getPosts`, currentSort], getPosts);

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
      <CommunityCard />
    </GridLayoutWrapper>
  );
};

export default Home;
