import jwt, { JwtPayload } from "jsonwebtoken";

export const checkTokens = (): boolean => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");

    if (!refresh_token && !access_token) {
      return false;
    }

    // first check, if you have a valid refresh_token
    // decode the token
    const rtoken = jwt.decode(refresh_token as string) as JwtPayload;
    let exp = null;

    if (rtoken && rtoken?.exp) {
      exp = rtoken.exp;
    }

    // if no exp date or expired exp date
    if (!exp || exp < new Date().getTime() / 1000) {
      // invalid refresh_token
      // now check for access_token
      const atoken = jwt.decode(access_token as string) as JwtPayload;
      let exp = null;

      if (atoken && atoken?.exp) {
        exp = atoken.exp;
      }

      // if no exp date or expired exp date
      if (!exp || exp < new Date().getTime() / 1000) {
        return false;
      }
    }

    // valid token
    return true;
  } catch (e) {
    return false;
  }
};

export const getTokens = () => {
  // check if the user has a valid refresh_token or a access_token
  if (checkTokens()) {
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
