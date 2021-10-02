import Community from "../models/community";
import Comment from "../models/comment";
import Post from "../models/post";
import mongoose from "mongoose";
import _ from "lodash";
import validator from "validator";

// GET /posts
export const getPosts = async (req, res) => {
  try {
    const { sortBy, comm } = req.query;
    const sort = sortBy === "New" ? { postedAt: -1 } : { votes: -1 };

    // if community in query parameter
    if (comm) {
      if (!comm.match(/^[A-Za-z0-9_]*$/)) {
        return res.status(400).send({
          success: false,
          data: {},
          message: "Invalid community name",
          statusCode: 400,
        });
      }

      // find the community
      const c = await Community.findOne({ name: comm });

      // if no community found
      if (!c) {
        return res.status(404).send({
          success: false,
          data: {},
          message: "Community doesn't exists",
          statusCode: 404,
        });
      }

      let posts = await Post.find({
        community: c,
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
          votes,
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
          votes,
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
    }

    // if user is signed in, then give 'em favorite posts
    // else give 'em all trending posts
    if (req.user) {
      const communities = await Community.find({
        subscribers: { $in: [req.user._id] },
      });

      //   he has joined some communities or has created some posts
      let posts = await Post.find({
        $or: [{ community: { $in: communities } }, { author: req.user._id }],
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
          votes,
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
          votes,
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
    }

    // give 'em all trending posts
    let posts = await Post.find({})
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
        votes,
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
        votes,
        postedAt,
      };
    });

    res.send({
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

// GET /posts/:id
export const getPost = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Id is required",
        statusCode: 400,
      });
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Invalid Id",
        statusCode: 400,
      });
    }

    const post = await Post.findOne({
      _id: id,
    })
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
      });

    if (!post) {
      return res.status(404).send({
        success: false,
        data: {},
        message: "No post with that id found",
        statusCode: 404,
      });
    }

    let {
      _id,
      title,
      kind,
      content,
      community,
      comments,
      author,
      votes,
      postedAt,
    } = post;

    comments = post.comments.length;

    return res.send({
      success: true,
      data: {
        _id,
        title,
        kind,
        content,
        community,
        comments,
        author,
        votes,
        postedAt,
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

// POST /posts
export const createPost = async (req, res) => {
  try {
    const { title, content, community, kind } = req.body;

    // validation
    if (!title) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Title is required",
        statusCode: 400,
      });
    } else if (title.length > 300) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Title length should be less than 300 characters",
        statusCode: 400,
      });
    }

    if (!kind) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Kind is required",
        statusCode: 400,
      });
    } else if (!["text", "url"].includes(kind)) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Invalid kind of post",
        statusCode: 400,
      });
    }

    if (!content) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Content is required",
        statusCode: 400,
      });
    }

    if (!community) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Community is required",
        statusCode: 400,
      });
    } else if (!community.match(/^[A-Za-z0-9_]*$/)) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Invalid community name",
        statusCode: 400,
      });
    }

    const foundCommunity = await Community.findOne({ name: community });

    if (!foundCommunity) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Community doesn't exists",
        statusCode: 400,
      });
    }

    // create a new post
    const newPost = await Post({
      title: validator.escape(title),
      content: validator.escape(content),
      kind,
      community: foundCommunity,
      author: req.user._id,
    });
    await newPost.save();

    return res.status(201).send({
      success: true,
      data: {},
      message: "New post has been created",
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

// DELETE /posts/:id
export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Id is required",
        statusCode: 400,
      });
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Invalid Id",
        statusCode: 400,
      });
    }

    const post = await Post.findOne({
      _id: id,
    });

    if (!post) {
      return res.status(404).send({
        success: false,
        data: {},
        message: "No post with that id found",
        statusCode: 404,
      });
    }

    // check if the current user is the owner of the post
    if (!_.isEqual(post.author._id, mongoose.Types.ObjectId(req.user._id))) {
      return res.status(403).send({
        success: false,
        data: {},
        message: "You don't have permissions to delete this post",
        statusCode: 403,
      });
    }

    // get all the comments
    await Comment.remove({ post });
    await post.remove();

    return res.send({
      success: true,
      data: {},
      message: `Post with the id ${post._id} deleted successfully`,
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
