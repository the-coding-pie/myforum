import Community from "../models/community";
import Post from "../models/post";

export const homeFeed = async (req, res) => {
  try {
    // if user is signed in, then give 'em favorite posts
    // else give 'em all trending posts
    if (req.user) {
      const communities = await Community.find({
        subscribers: { $in: [req.user._id] },
      });

      if (communities.length <= 0) {
        //   he is not part of any communities
        return res.send({
          success: true,
          data: {
            posts: [],
          },
          message: "Join some communities to fill your homeFeed",
          statusCode: 200,
        });
      }

      //   he has joined some communities
      const posts = await Post.find({
        community: { $in: [communities.map((c) => c._id)] },
      }).sort({ votes: -1 });

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
    const posts = await Post.find({}).sort({ votes: -1 });
    console.log("e");

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
