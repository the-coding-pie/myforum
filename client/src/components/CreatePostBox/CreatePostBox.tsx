import React, { useState } from "react";
import { Button } from "../shared/Button.style";
import {
  ButtonWrapper,
  ChooseButton,
  ChooseButtons,
  CreatePostBoxWrapper,
  FormGroup,
  RootWrapper,
} from "./CreatePostBox.style";

const CreatePostBox = () => {
  const [isText, setIsText] = useState(true);

  const handleToggle = () => {
    setIsText((prevValue) => !prevValue);
  };

  return (
    <RootWrapper>
      <h3>Create a Post</h3>

      <CreatePostBoxWrapper>
        <ChooseButtons>
          <ChooseButton active={isText} onClick={handleToggle}>
            Text
          </ChooseButton>
          <ChooseButton active={!isText} onClick={handleToggle}>
            Link
          </ChooseButton>
        </ChooseButtons>

        <form>
          <FormGroup>
            <label htmlFor="community">Community</label>
            <select id="community">
              <option value="c/programming">c/programming</option>
              <option value="c/nursing">c/nursing</option>
              <option value="c/housing">c/housing</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" placeholder="title" />
          </FormGroup>

          {isText ? (
            <FormGroup>
              <label htmlFor="text">Text</label>
              <textarea id="text" placeholder="text"></textarea>
            </FormGroup>
          ) : (
            <FormGroup>
              <label htmlFor="url">Url</label>
              <input type="text" id="url" placeholder="url" />
            </FormGroup>
          )}

          <ButtonWrapper>
            <Button sm>Create Post</Button>
          </ButtonWrapper>
        </form>
      </CreatePostBoxWrapper>
    </RootWrapper>
  );
};

export default CreatePostBox;
