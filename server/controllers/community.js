import Community from "../models/community";

// GET /communities
export const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find({}).populate({
        path: "admin",
        select: "username"
    })

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
    const { name } = req.body;

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
    const newCommunity = await Community({ name, admin: req.user._id });
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
