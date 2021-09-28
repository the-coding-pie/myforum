import React from "react";
import { Button } from "../shared/Button.style";
import { CommentBoxWrapper } from "./CommentBox.style";

const CommentBox = () => {
  return (
    <CommentBoxWrapper>
      <form>
        <textarea placeholder="What are your thoughts?"></textarea>

        <div className="button-wrapper">
          <Button sm>Comment</Button>
        </div>
      </form>
    </CommentBoxWrapper>
  );
};

export default CommentBox;
