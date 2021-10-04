import axios from "axios";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useHistory, Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { addToast } from "../../features/toastSlice";
import { Post } from "../../types";
import { BASE_URL, ERROR, SUCCESS } from "../../types/constants";
import { getDate } from "../../utils/helpers";
import {
  PostCardBottom,
  PostCardLeft,
  PostCardRight,
  PostCardWrapper,
} from "./PostCard.style";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "react-query";
import { DeleteBtn } from "../shared/DeleteBtn.style";

const PostCard = ({
  _id,
  title,
  content,
  comments,
  community,
  upVoters,
  downVoters,
  author,
  postedAt,
  votes,
}: Post) => {
  const { pathname } = useLocation();
  const params = useParams<any>();
  const history = useHistory();

  const { accessToken, refreshToken, user } = useSelector(
    (state: RootState) => state.auth
  );

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      axios
        .delete(`${BASE_URL}/posts/${_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const msg = response.data.message;

          dispatch(
            addToast({
              id: uuidv4(),
              kind: SUCCESS,
              msg,
            })
          );

          // act accordingly
          // if / or /u/:username or /c/:name or /search -> refetch
          // if /posts/:id, redirect
          if (pathname.includes("/u")) {
            queryClient.invalidateQueries(`getUsersPosts/${params.username}`);
          }

          if (pathname === "/") {
            queryClient.invalidateQueries("getPosts");
          }

          if (pathname.includes("/search")) {
            queryClient.invalidateQueries(`search`);
          }

          if (pathname.includes("/c/")) {
            queryClient.invalidateQueries(`getCommunityPosts/${params.name}`);
          }

          if (pathname.includes("/posts")) {
            history.push("/");
          }
        })
        .catch(({ response }) => {
          try {
            switch (response.status) {
              case 400:
              case 403:
              case 404:
                dispatch(
                  addToast({
                    id: uuidv4(),
                    kind: ERROR,
                    msg: response.data.message,
                  })
                );
                break;
              default:
                dispatch(
                  addToast({
                    id: uuidv4(),
                    kind: ERROR,
                    msg: "Oops, something went wrong! Try reload...",
                  })
                );
                break;
            }
          } catch (e) {
            dispatch(
              addToast({
                id: uuidv4(),
                kind: ERROR,
                msg: "Oops, something went wrong!",
              })
            );
          }
        });
    },
    []
  );

  const handleUpvote = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      axios
        .post(
          `${BASE_URL}/posts/${_id}/upvote`,
          {},
          {
            headers: {
              ContentType: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          // act accordingly
          // if / or /u/:username or /c/:name or /search -> refetch
          // if /posts/:id, redirect
          if (pathname.includes("/u")) {
            queryClient.invalidateQueries(`getUsersPosts/${params.username}`);
          }

          if (pathname === "/") {
            queryClient.invalidateQueries("getPosts");
          }

          if (pathname.includes("/search")) {
            queryClient.invalidateQueries(`search`);
          }

          if (pathname.includes("/c/")) {
            queryClient.invalidateQueries(`getCommunityPosts/${params.name}`);
          }

          if (pathname.includes("/posts")) {
            queryClient.invalidateQueries(`getSinglePost/${_id}`);
          }
        })
        .catch(({ response }) => {
          try {
            switch (response.status) {
              case 400:
              case 404:
                dispatch(
                  addToast({
                    id: uuidv4(),
                    kind: ERROR,
                    msg: response.data.message,
                  })
                );
                break;
              default:
                dispatch(
                  addToast({
                    id: uuidv4(),
                    kind: ERROR,
                    msg: "Oops, something went wrong! Try reload...",
                  })
                );
                break;
            }
          } catch (e) {
            dispatch(
              addToast({
                id: uuidv4(),
                kind: ERROR,
                msg: "Oops, something went wrong!",
              })
            );
          }
        });
    },
    []
  );

  const handleDownVote = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      axios
        .post(
          `${BASE_URL}/posts/${_id}/downvote`,
          {},
          {
            headers: {
              ContentType: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          // act accordingly
          // if / or /u/:username or /c/:name or /search -> refetch
          // if /posts/:id, redirect
          if (pathname.includes("/u")) {
            queryClient.invalidateQueries(`getUsersPosts/${params.username}`);
          }

          if (pathname === "/") {
            queryClient.invalidateQueries("getPosts");
          }

          if (pathname.includes("/search")) {
            queryClient.invalidateQueries(`search`);
          }

          if (pathname.includes("/c/")) {
            queryClient.invalidateQueries(`getCommunityPosts/${params.name}`);
          }

          if (pathname.includes("/posts")) {
            queryClient.invalidateQueries(`getSinglePost/${_id}`);
          }
        })
        .catch(({ response }) => {
          try {
            switch (response.status) {
              case 400:
              case 404:
                dispatch(
                  addToast({
                    id: uuidv4(),
                    kind: ERROR,
                    msg: response.data.message,
                  })
                );
                break;
              default:
                dispatch(
                  addToast({
                    id: uuidv4(),
                    kind: ERROR,
                    msg: "Oops, something went wrong! Try reload...",
                  })
                );
                break;
            }
          } catch (e) {
            dispatch(
              addToast({
                id: uuidv4(),
                kind: ERROR,
                msg: "Oops, something went wrong!",
              })
            );
          }
        });
    },
    []
  );

  return (
    <PostCardWrapper>
      <PostCardLeft>
        <button
          disabled={!accessToken && !refreshToken}
          onClick={handleUpvote}
          className={
            upVoters.filter((v) => v._id === user?._id).length > 0
              ? "active-upvote-btn"
              : ""
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>

        <span className="votes">{votes}</span>

        <button
          disabled={!accessToken && !refreshToken}
          onClick={handleDownVote}
          className={
            downVoters.filter((v) => v._id === user?._id).length > 0
              ? "active-downvote-btn"
              : ""
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </PostCardLeft>
      <PostCardRight>
        <div className="top">
          <h3>
            <Link to={`/posts/${_id}`}>
              {title.length > 30 ? title.slice(0, 30) + "..." : title}
            </Link>
          </h3>
          {user?._id === author._id && (
            <DeleteBtn onClick={handleDelete}>delete</DeleteBtn>
          )}
        </div>

        <p>{content.length > 20 ? content.slice(0, 20) + "..." : content}</p>

        <PostCardBottom>
          <span className="comments">
            <Link to={`/posts/${_id}`}>{comments} Comments</Link>
          </span>

          <span className="community">
            <Link to={`/c/${community.name}`}>c/{community.name}</Link>
          </span>

          <span>
            by{" "}
            <span className="user">
              <Link to={`/u/${author.username}`}>u/{author.username}</Link>
            </span>
          </span>

          <span className="date">{getDate(postedAt)}</span>
        </PostCardBottom>
      </PostCardRight>
    </PostCardWrapper>
  );
};

export default PostCard;
