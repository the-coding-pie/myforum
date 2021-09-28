import jwt, { JwtPayload } from "jsonwebtoken";

export const checkRefreshToken = (): boolean => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");

    if (!refresh_token) {
      return false;
    }

    // decode the token
    const token = jwt.decode(refresh_token) as JwtPayload;
    let exp = null;

    if (token && token?.exp) {
      exp = token.exp;
    }

    // if no exp date or expired exp date
    if (!exp || exp < new Date().getTime() / 1000) {
      return false;
    }

    // valid token
    return true;
  } catch (e) {
    return false;
  }
};

export const getTokens = () => {
  // try to get refresh_token from localStorage and validate it
  if (checkRefreshToken()) {
    return {
      access_token: localStorage.getItem("access_token"),
      refresh_token: localStorage.getItem("refresh_token"),
    };
  }

  removeTokens();
  return {
    access_token: null,
    refresh_token: null,
  };
};

export const saveTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

// fn to save new access token
export const saveAccessTokens = (accessToken: string): void => {
  localStorage.setItem("access_token", accessToken);
};

// fn to remove tokens
export const removeTokens = (): void => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// isValid fn
export const isValid = (errors: Object): boolean => {
  let valid = true;

  Object.values(errors).forEach((error) => error.length > 0 && (valid = false));

  return valid;
};