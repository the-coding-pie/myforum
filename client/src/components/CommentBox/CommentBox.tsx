import axios from "axios";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { addToast } from "../../features/toastSlice";
import { BASE_URL, ERROR, SUCCESS } from "../../types/constants";
import { Button } from "../shared/Button.style";
import { CommentBoxWrapper } from "./CommentBox.style";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  postId: string;
}

const CommentBox = ({ postId }: Props) => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const addComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    axios
      .post(
        `${BASE_URL}/posts/${postId}/comments`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const msg = response.data.message;

        dispatch(
          addToast({
            id: uuidv4(),
            kind: SUCCESS,
            msg,
          })
        );

        setComment("");

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
  };

  return (
    <CommentBoxWrapper>
      <form>
        <textarea
          placeholder="What are your thoughts?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <div className="button-wrapper">
          <Button sm disabled={!comment} onClick={addComment}>
            Comment
          </Button>
        </div>
      </form>
    </CommentBoxWrapper>
  );
};

export default CommentBox;
