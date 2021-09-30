import mongoose from "mongoose";
import Community from "../models/community";
import * as _ from "lodash";

// GET /communities
export const getCommunities = async (req, res) => {
  try {
    // const communities = await Community.find({}).populate({
    //   path: "admin",
    //   select: "username",
    // });
    const communities = await Community.find({}).select("_id name").sort({ subscribers: -1 });

    res.send({
      success: true,
      data: {
        communities,
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

// POST /communities
export const createCommunity = async (req, res) => {
  try {
    const { name, about } = req.body;

    // validation
    if (!name) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Name is required",
        statusCode: 400,
      });
    } else if (!name.match(/^[A-Za-z0-9_-]*$/)) {
      return res.status(400).send({
        success: false,
        data: {},
        message:
          "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores",
        statusCode: 400,
      });
    }

    // check if that community already exists
    const community = await Community.findOne({ name });

    // 409 conflict
    if (community) {
      return res.status(409).send({
        success: false,
        data: {},
        message: "Community with that name already exists!",
        statusCode: 409,
      });
    }

    // create a new community
    const newCommunity = await Community({ name, admin: req.user._id, about });
    await newCommunity.save();

    res.status(201).send({
      success: true,
      data: {},
      message: "New Community has been created successfully",
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

// PUT /communities/:name/subscribers
export const updateSubscribers = async (req, res) => {
  try {
    const name = req.params.name.trim();

    if (!name) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Community name is required",
        statusCode: 400,
      });
    }

    if (!name.match(/^[A-Za-z0-9_-]*$/)) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Invalid community name",
        statusCode: 400,
      });
    }

    // find the community
    const community = await Community.findOne({ name });

    // if no community found
    if (!community) {
      return res.status(404).send({
        success: false,
        data: {},
        message: "Community doesn't exists",
        statusCode: 404,
      });
    }

    // add/remove subscriber
    if (community.subscribers.includes(mongoose.Types.ObjectId(req.user._id))) {
      community.subscribers = community.subscribers.filter((s) => {
        return !_.isEqual(s._id, mongoose.Types.ObjectId(req.user._id));
      });
      await community.save();

      return res.send({
        success: true,
        data: {},
        message: "Subscriber removed",
        statusCode: 200,
      });
    }

    // string will automatically get converted to ObjectId for ref in mongoose
    community.subscribers.push(req.user._id);
    await community.save();

    res.send({
      success: true,
      data: {},
      message: "Subscriber added",
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
