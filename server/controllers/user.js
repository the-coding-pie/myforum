import Post from "../models/post";
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

    if (!username.match(/^[A-Za-z0-9_\-]*$/)) {
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

    return res.send({
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

// get the user's posts
// GET /users/:username/posts
export const getUsersPosts = async (req, res) => {
  try {
    const username = req.params.username.trim();
    const { sortBy } = req.query;
    const sort = sortBy === "New" ? { postedAt: -1 } : { votes: -1 };

    if (!username) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Username is required",
        statusCode: 400,
      });
    }

    if (!username.match(/^[A-Za-z0-9_\-]*$/)) {
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

    // let fetch all his posts
    let posts = await Post.find({
      author: user,
    })
      .sort(sort)
      .populate({
        path: "author",
        select: "username _id",
      })
      .populate({
        path: "community",
        select: "name _id",
      })
      .populate({
        path: "comments",
        select: "_id",
      })
      .populate({
        path: "upVoters",
        select: "_id",
      })
      .populate({
        path: "downVoters",
        select: "_id",
      });

    posts = await posts.map((p) => {
      let {
        _id,
        title,
        kind,
        content,
        community,
        comments,
        author,
        upVoters,
        downVoters,
        postedAt,
      } = p;

      comments = p.comments.length;
      return {
        _id,
        title,
        kind,
        content,
        community,
        comments,
        author,
        upVoters,
        downVoters,
        postedAt,
      };
    });

    return res.send({
      success: true,
      data: {
        posts,
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
