import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../app/store";
import CommentBox from "../../components/CommentBox/CommentBox";
import Comments from "../../components/Comments/Comments";
import { GridLayoutWrapper } from "../../components/shared/GridLayout.style";
import SinglePost from "../../components/SinglePost/SinglePost";
import { BASE_URL } from "../../types/constants";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { accessToken, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );

  const getSinglePost = async () => {
    const res = await axios.get(`${BASE_URL}/posts/${id}`);

    return res.data.data;
  };

  const { data, isLoading, error } = useQuery(
    [`getSinglePost/${id}`],
    getSinglePost
  );

  return (
    <GridLayoutWrapper>
      <div>
        <SinglePost {...{ isLoading, error, post: data }} />

        {data && (refreshToken || accessToken) && <CommentBox postId={id} />}

        <Comments id={id} />
      </div>
    </GridLayoutWrapper>
  );
};

export default PostDetail;