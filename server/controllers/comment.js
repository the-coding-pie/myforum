import mongoose from "mongoose";
import _ from "lodash";
import Post from "../models/post";
import Comment from "../models/comment";
import validator from "validator";

// GET /posts/:id/comments
export const getComments = async (req, res) => {
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

    const comments = await Comment.find({ post: post })
      .select("-post")
      .sort({ postedAt: -1 })
      .populate({
        path: "commentator",
        select: "username _id",
      })

    res.send({
      success: true,
      data: {
        comments,
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

// POST /posts/:id/comments
export const addComment = async (req, res) => {
  try {
    const id = req.params.id;

    const { comment } = req.body;

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

    if (!comment) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Comment is required",
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

    // valid post and comment
    // sanitize it and save
    const newComment = await Comment({
      comment: validator.escape(comment),
      post,
      commentator: req.user._id,
    });
    await newComment.save();

    await post.comments.push(newComment);
    await post.save();

    res.status(201).send({
      success: true,
      data: {},
      message: "Your comment has been added",
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

// DELETE /comments/:id
export const deleteComment = async (req, res) => {
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

    const comment = await Comment.findOne({
      _id: id,
    });

    if (!comment) {
      return res.status(404).send({
        success: false,
        data: {},
        message: "No comment with that id found",
        statusCode: 404,
      });
    }

    // check if the current user is the commentator of the comment
    if (
      !_.isEqual(comment.commentator._id, mongoose.Types.ObjectId(req.user._id))
    ) {
      return res.status(403).send({
        success: false,
        data: {},
        message: "You don't have permissions to delete this comment",
        statusCode: 403,
      });
    }

    const p = await Post.findOne({ _id: comment.post._id });

    await Comment.deleteOne({ _id: id });
    p.update({ $pull: { comments: comment } });

    return res.send({
      success: true,
      data: {},
      message: `Comment with the id ${comment._id} deleted successfully`,
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
