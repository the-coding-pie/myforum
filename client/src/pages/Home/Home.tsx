import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CommunityCard from "../../components/CommunityCard/CommunityCard";
import PostCard from "../../components/PostCard/PostCard";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";
import {
  SortDropdownSelect,
  SortDropdownWrapper,
} from "../../components/shared/SortDropdown.style";
import { logoutUser } from "../../features/authSlice";
import { addToast } from "../../features/toastSlice";
import { Post } from "../../types";
import { BASE_URL, ERROR } from "../../types/constants";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const dispatch = useDispatch();

  const getPosts = useCallback(() => {
    axios
      .get(`${BASE_URL}/posts`)
      .then((response) => {
        const { data } = response.data;
        setPosts(data.posts);
      })
      .catch(({ response }) => {
        try {
          switch (response.status) {
            default:
              dispatch(
                addToast({
                  kind: ERROR,
                  msg: "Oops, something went wrong",
                })
              );
          }
        } catch {
          dispatch(
            addToast({
              kind: ERROR,
              msg: "Oops, something went wrong",
            })
          );
        }
      });
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  console.log(posts);

  return (
    <GridLayoutWrapper>
      <div>
        <SortDropdownWrapper>
          <SortDropdownSelect>
            <option value="popular">Popular</option>
            <option value="new">New</option>
          </SortDropdownSelect>
        </SortDropdownWrapper>
        {posts && posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} {...post} />)
        ) : (
          <p>Oops, no posts found!</p>
        )}
      </div>
      <CommunityCard />
    </GridLayoutWrapper>
  );
};

export default Home;
