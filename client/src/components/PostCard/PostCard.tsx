import { Link } from "react-router-dom";
import { Post } from "../../types";
import {
  PostCardBottom,
  PostCardLeft,
  PostCardRight,
  PostCardWrapper,
} from "./PostCard.style";

const PostCard = ({
  id,
  title,
  content,
  comments,
  community,
  user,
  datePosted,
}: Post) => {
  return (
    <PostCardWrapper>
      <PostCardLeft>
        <button>
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
        <span className="comments">{comments}</span>

        <button>
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
        <h3>
          <Link to={`/posts/${id}`}>{title}</Link>
        </h3>

        <p>{content.length > 20 ? content.slice(0, 20) + "..." : content}</p>

        <PostCardBottom>
          <span className="comments">
            <Link to={`/posts/${id}`}>{comments} Comments</Link>
          </span>

          <span className="community">
            <Link to={`/${community}`}>{community}</Link>
          </span>

          <span>
            by{" "}
            <span className="user">
              <Link to={`/${user}`}>{user}</Link>
            </span>
          </span>

          <span className="date">{datePosted}</span>
        </PostCardBottom>
      </PostCardRight>
    </PostCardWrapper>
  );
};

export default PostCard;
