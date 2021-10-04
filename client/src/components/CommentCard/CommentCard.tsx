import axios from "axios";
import React from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { addToast } from "../../features/toastSlice";
import { CommentObj } from "../../types";
import { BASE_URL, ERROR, SUCCESS } from "../../types/constants";
import { getDate } from "../../utils/helpers";
import { DeleteBtn } from "../shared/DeleteBtn.style";
import { CommentCardTop, CommentCardWrapper } from "./CommentCard.style";
import { v4 as uuidv4 } from "uuid";

interface Props extends CommentObj {
  postId: string;
}

const CommentCard = ({
  _id,
  comment,
  postedAt,
  commentator,
  postId,
}: Props) => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    axios
      .delete(`${BASE_URL}/comments/${_id}`, {
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

        queryClient.invalidateQueries(`getComments/${postId}`);
        queryClient.invalidateQueries(`getSinglePost/${postId}`);
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
                  msg: "Oops, something went wrong!",
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
  };

  return (
    <CommentCardWrapper>
      <CommentCardTop>
        <div>
          <Link to={`/u/${commentator.username}`}>{commentator.username}</Link>
          <time>{getDate(postedAt)}</time>
        </div>
        {user?._id === commentator._id && (
          <DeleteBtn onClick={handleDelete}>delete</DeleteBtn>
        )}
      </CommentCardTop>
      <p>{comment}</p>
    </CommentCardWrapper>
  );
};

export default CommentCard;
