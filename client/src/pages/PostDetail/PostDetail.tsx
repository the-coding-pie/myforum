import CommentBox from "../../components/CommentBox/CommentBox";
import CommentCard from "../../components/CommentCard/CommentCard";
import PostCard from "../../components/PostCard/PostCard";
import PostCommunityCard from "../../components/PostCommunityCard/PostCommunityCard";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";
import posts from "../../posts.json";

const comments = [
  {
    _id: 1,
    username: "u/thecodingpie",
    datePosted: "22 hrs ago",
    comment: "lasdfjlas aslkdfjalksdfj lasdjfalskdfjasldfasdf asdf",
  },
  {
    _id: 2,
    username: "u/thecodingpie",
    datePosted: "22 hrs ago",
    comment: "lasdfjlas aslkdfjalksdfj lasdjfalskdfjasldfasdf asdf",
  },
  {
    _id: 3,
    username: "u/thecodingpie",
    datePosted: "22 hrs ago",
    comment: "lasdfjlas aslkdfjalksdfj lasdjfalskdfjasldfasdf asdf",
  },
];

const PostDetail = () => {
  return (
    <GridLayoutWrapper>
      <div>
        {posts.length > 0 ? (
          <>
            {/* <PostCard {...posts[0]} /> */}
            <CommentBox />

            {comments.length > 0 && comments.map((c) => <CommentCard {...c} />)}
          </>
        ) : (
          <p>Oops, no posts found!</p>
        )}
      </div>
      <PostCommunityCard />
    </GridLayoutWrapper>
  );
};

export default PostDetail;
