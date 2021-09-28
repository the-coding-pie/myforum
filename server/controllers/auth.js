import { User } from "../models/user";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import jwt from "jsonwebtoken";

// /auth/getUser
export const getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id });

    if (!user) {
      return res.status(404).send({
        success: false,
        data: {},
        message: "User not found",
        statusCode: 404,
      });
    }

    const { _id, username, email } = user;

    res.send({
      success: true,
      data: {
        _id,
        username,
        email,
      },
    });
  } catch {
    res.status(500).send({
      success: false,
      data: {},
      message: "Oops, something went wrong!",
      statusCode: 500,
    });
  }
};

// /auth/register
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Username is required",
        statusCode: 400,
      });
    }

    // if no email exists
    if (!email) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Email is required",
        statusCode: 400,
      });
    } else if (
      !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Invalid email",
        statusCode: 400,
      });
    }

    if (!password) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Password is required",
        statusCode: 400,
      });
    } else if (password.length < 8) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Password must be at least 8 chars long",
        statusCode: 400,
      });
    }

    // check if the user already exists or not
    const userWithUsername = await User.findOne({ username });
    const userWithEmail = await User.findOne({ email });

    if (userWithUsername || userWithEmail) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "User with that username or email already exists",
        statusCode: 400,
      });
    }

    // create a new user
    const newUser = await User({ username, email, password });
    await newUser.save();

    res.status(201).send({
      success: true,
      data: {
        username: newUser.username,
        email: newUser.email,
      },
      message: "New User has been created successfully. Log in to continue.",
      statusCode: 201,
    });
  } catch {
    res.status(500).send({
      success: false,
      data: {},
      message: "Oops, something went wrong!",
      statusCode: 500,
    });
  }
};

// /auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    // if no email exists
    if (!email) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Email is required",
        statusCode: 400,
      });
    } else if (
      !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Invalid email",
        statusCode: 400,
      });
    }

    if (!password) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Password is required",
        statusCode: 400,
      });
    }

    // if you got email and password, check on db
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({
        success: false,
        data: {},
        message: "Invalid email or password",
        statusCode: 401,
      });
    }

    // email and password matches
    // generate jwt tokens
    const accessToken = generateAccessToken({
      username: user.username,
      _id: user._id,
    });

    const refreshToken = generateRefreshToken({
      username: user.username,
      _id: user._id,
    });

    return res.status(200).send({
      success: true,
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
      message: "",
      statusCode: 200,
    });
  } catch {
    res.status(500).send({
      success: false,
      data: {},
      message: "Oops, something went wrong!",
      statusCode: 500,
    });
  }
};

// /auth/refresh
export const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    // if no refreshToken, or if it is invalid one
    if (!refresh_token) {
      return res.status(401).send({
        success: false,
        data: {},
        message: "Invalid refresh token",
        statusCode: 401,
      });
    }

    // check validity of refresh token
    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      function (err, user) {
        if (err) {
          return res.status(401).send({
            success: false,
            data: {},
            message: "Invalid refresh token",
            statusCode: 401,
          });
        }

        // valid refresh token, so generate a new accessToken and send it
        const newAccessToken = generateAccessToken({
          username: user.username,
          _id: user._id,
        });
        return res.send({
          success: true,
          data: {
            access_token: newAccessToken,
          },
          message: "",
          statusCode: 200,
        });
      }
    );
  } catch {
    res.status(500).send({
      success: false,
      data: {},
      message: "Oops, something went wrong!",
      statusCode: 500,
    });
  }
};
