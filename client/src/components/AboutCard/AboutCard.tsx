import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { addToast } from "../../features/toastSlice";
import { CommunityDetailObj } from "../../types";
import { BASE_URL, ERROR, SUCCESS } from "../../types/constants";
import { getMDY } from "../../utils/helpers";
import { Button } from "../shared/Button.style";
import { AboutBody, AboutCardWrapper } from "./AboutCard.style";
import { v4 as uuidv4 } from "uuid";
import Skeleton from "react-loading-skeleton";

interface Props {
  name: string;
}

const AboutCard = ({ name }: Props) => {
  const { accessToken, refreshToken, user } = useSelector(
    (state: RootState) => state.auth
  );

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const getCommunity = async () => {
    const res = await axios.get(`${BASE_URL}/communities/${name}`);

    return res.data.data;
  };

  const {
    data: community,
    isLoading,
    error,
  } = useQuery<CommunityDetailObj, any>([`getCommunity/${name}`], getCommunity);

  if (isLoading) {
    return (
      <AboutCardWrapper>
        <div className="top">
          <h3>About Community</h3>
        </div>
        <Skeleton height="185px" />
      </AboutCardWrapper>
    );
  }

  if (error) {
    let text = "";

    switch (error.response.status) {
      case 400:
        text = "Bad Request: 400";
        break;
      case 404:
        text = "Resource Not Found: 404";
        break;
      default:
        text = "Oops, something went wrong";
    }

    return (
      <AboutCardWrapper>
        <div className="top">
          <h3>About Community</h3>
        </div>
        <AboutBody>
          <div
            className="error-side-box"
            style={{
              color: "#be2a2a",
              textAlign: "center",
            }}
          >
            {text}
          </div>
        </AboutBody>
      </AboutCardWrapper>
    );
  }

  const joinOrLeaveCommunity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    axios
      .put(
        `${BASE_URL}/communities/${name}/subscribers`,
        {},
        {
          headers: {
            ContentType: "application/json",
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

        queryClient.invalidateQueries(`getCommunity/${name}`);
      })
      .catch(({ response }) => {
        try {
          switch (response.status) {
            case 400:
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
    <AboutCardWrapper>
      <div className="top">
        <h3>About Community</h3>
      </div>

      <AboutBody>
        <p
          style={{
            textAlign: "center",
          }}
        >
          {community?.about}
        </p>
        <div className="subscribers">
          {community?.subscribersCount}
          <p>Subscribers</p>
        </div>
        <div className="created">
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
              d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
            />
          </svg>
          Created {community?.createdAt && getMDY(community?.createdAt)}
        </div>

        {(accessToken || refreshToken) &&
          (community?.subscribers
            .map((s) => s._id)
            .includes(user?._id as string) ? (
            <Button light onClick={joinOrLeaveCommunity}>
              Leave
            </Button>
          ) : (
            <Button sm onClick={joinOrLeaveCommunity}>
              Join
            </Button>
          ))}
      </AboutBody>
    </AboutCardWrapper>
  );
};

export default AboutCard;
