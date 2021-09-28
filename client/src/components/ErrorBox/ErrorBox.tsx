import React from "react";
import { ErrorBoxWrapper } from "./ErrorBox.style";

interface Props {
  error: string;
}

const ErrorBox = ({ error }: Props) => {
  return <ErrorBoxWrapper>{error}</ErrorBoxWrapper>;
};

export default ErrorBox;
