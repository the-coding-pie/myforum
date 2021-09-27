import CommentBox from "../../components/CommentBox/CommentBox";
import PostCard from "../../components/PostCard/PostCard";
import PostCommunityCard from "../../components/PostCommunityCard/PostCommunityCard";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";
import posts from "../../posts.json";

const PostDetail = () => {
  return (
    <GridLayoutWrapper>
      <div>
        {posts.length > 0 ? (
          <>
            <PostCard {...posts[0]} />
            <CommentBox />
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
