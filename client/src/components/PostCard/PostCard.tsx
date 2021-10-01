import { Link } from "react-router-dom";
import { Post } from "../../types";
import {
  PostCardBottom,
  PostCardLeft,
  PostCardRight,
  PostCardWrapper,
} from "./PostCard.style";

const PostCard = ({
  _id,
  title,
  content,
  comments,
  community,
  author,
  postedAt,
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
          <Link to={`/posts/${_id}`}>{title}</Link>
        </h3>

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

          <span className="date">{postedAt}</span>
        </PostCardBottom>
      </PostCardRight>
    </PostCardWrapper>
  );
};

export default PostCard;
