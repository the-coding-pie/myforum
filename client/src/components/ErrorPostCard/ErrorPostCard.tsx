import React from "react";
import { ErrorPostCardWrapper } from "./ErrorPostCard.style";

interface Props {
  error: any;
}

const ErrorPostCard = ({ error }: Props) => {
  let text = "";

  switch (error?.response?.status) {
    case 400:
      text = "Bad Request: 400";
      break;
    case 404:
      text = "Resource Not Found: 404";
      break;
    default:
      text = "Oops, something went wrong";
  }
  return <ErrorPostCardWrapper>{text}</ErrorPostCardWrapper>;
};

export default ErrorPostCard;
