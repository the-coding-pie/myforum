import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../../features/toastSlice";
import { BASE_URL, ERROR, SUCCESS } from "../../types/constants";
import { Button } from "../shared/Button.style";
import {
  Buttons,
  ButtonWrapper,
  ChooseButton,
  ChooseButtons,
  CreatePostBoxWrapper,
  FormGroup,
  RootWrapper,
} from "./CreatePostBox.style";
import { v4 as uuidv4 } from "uuid";
import { CommunityObj } from "../../types";
import { isValid } from "../../utils/helpers";
import { RootState } from "../../app/store";
import { useHistory } from "react-router";
import { ErrorText } from "../shared/InputBox.style";

const CreatePostBox = () => {
  const history = useHistory();

  const [communities, setCommunities] = useState<CommunityObj[]>([]);
  const [isText, setIsText] = useState(true);
  const [post, setPost] = useState({
    title: "",
    content: "",
    kind: "text",
    community: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    kind: "",
    community: "",
    common: "",
  });

  const { accessToken } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  // fn to fetch all communities
  const getCommunities = useCallback(() => {
    axios
      .get(`${BASE_URL}/communities`)
      .then((response) => {
        // set communities
        setCommunities(response.data.data.communities);
        // set initial community
        setPost((prevValue) => {
          return {
            ...prevValue,
            community: response.data.data.communities[0].name,
          };
        });
      })
      .catch(({ response }) => {
        try {
          switch (response.status) {
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
  }, []);

  const createPost = useCallback((post) => {
    axios
      .post(`${BASE_URL}/posts`, post, {
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch(
          addToast({
            id: uuidv4(),
            kind: SUCCESS,
            msg: response.data.message,
          })
        );

        // redirect him to the /
        history.push("/");
      })
      .catch(({ response }) => {
        try {
          switch (response.status) {
            case 400:
              setErrors((prevValue) => {
                return {
                  ...prevValue,
                  common: response.data.message,
                };
              });
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
  }, []);

  // handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errors = {
      title: "",
      content: "",
      kind: "",
      community: "",
      common: "",
    };

    if (post.title === "") {
      errors.title = "Title is required";
    } else if (post.title.length > 300) {
      errors.title = "Title length should be less than 300 characters";
    }

    if (post.kind === "") {
      errors.kind = "Kind is required";
    } else if (!["text", "url"].includes(post.kind)) {
      errors.kind = "Invalid kind of post";
    }

    if (post.content === "") {
      errors.content = "Content is required";
    }

    if (post.community === "") {
      errors.community = "Community is required";
    }

    setErrors((prevValue) => {
      return {
        ...prevValue,
        ...errors,
      };
    });

    if (isValid(errors)) {
      createPost(post);
    }
  };

  // handle toggling btw text and link
  const handleToggle = () => {
    setIsText((prevValue) => !prevValue);
  };

  // set "kind" of post obj
  useEffect(() => {
    setPost((prevValue) => {
      return {
        ...prevValue,
        kind: isText ? "text" : "url",
      };
    });
  }, [isText]);

  useEffect(() => {
    getCommunities();
  }, []);

  return (
    <RootWrapper>
      <h3>Create a Post</h3>

      <CreatePostBoxWrapper>
        <ChooseButtons>
          <Buttons>
            <ChooseButton active={isText} onClick={handleToggle}>
              Text
            </ChooseButton>
            <ChooseButton active={!isText} onClick={handleToggle}>
              Link
            </ChooseButton>
          </Buttons>
          <div className="error">
            {errors.kind && <ErrorText>{errors.kind}</ErrorText>}
          </div>
        </ChooseButtons>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="community">Community</label>
            <select
              id="community"
              onChange={(e) =>
                setPost((prevValue) => {
                  return {
                    ...prevValue,
                    community: e.target.value,
                  };
                })
              }
            >
              {communities.length > 0 &&
                communities.map((c) => {
                  return <option key={c._id} value={c.name}>c/{c.name}</option>;
                })}
            </select>
            {errors.community && <ErrorText>{errors.community}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              id="title"
              placeholder="title"
              onChange={handleChange}
              value={post.title}
            />
            {errors.title && <ErrorText>{errors.title}</ErrorText>}
          </FormGroup>

          {isText ? (
            <FormGroup>
              <label htmlFor="text">Text</label>
              <textarea
                name="content"
                id="text"
                placeholder="text"
                onChange={handleChange}
                value={post.content}
              ></textarea>
              {errors.content && <ErrorText>{errors.content}</ErrorText>}
            </FormGroup>
          ) : (
            <FormGroup>
              <label htmlFor="url">Url</label>
              <input
                name="content"
                type="text"
                id="url"
                placeholder="url"
                onChange={handleChange}
                value={post.content}
              />
              {errors.content && <ErrorText>{errors.content}</ErrorText>}
            </FormGroup>
          )}

          <ButtonWrapper>
            <Button
              sm
              type="submit"
              disabled={
                post.title === "" ||
                post.content === "" ||
                post.community === ""
              }
            >
              Create Post
            </Button>
          </ButtonWrapper>

          <div className="error">
            {errors.common && <ErrorText>{errors.common}</ErrorText>}
          </div>
        </form>
      </CreatePostBoxWrapper>
    </RootWrapper>
  );
};

export default CreatePostBox;
