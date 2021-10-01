import { User } from "../models/user";

// GET /users/:username
export const getUser = async (req, res) => {
  try {
    const username = req.params.username.trim();

    if (!username) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Username is required",
        statusCode: 400,
      });
    }

    if (!username.match(/^[A-Za-z0-9_-]*$/)) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Invalid username",
        statusCode: 400,
      });
    }

    // find the user
    const user = await User.findOne({ username }).select(
      "_id username joinedAt"
    );

    // if no user found
    if (!user) {
      return res.status(404).send({
        success: false,
        data: {},
        message: "User doesn't exists",
        statusCode: 404,
      });
    }

    res.send({
      success: true,
      data: user,
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
