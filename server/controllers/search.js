import Community from "../models/community";
import Post from "../models/post";

// GET /search?q=hello
export const search = async (req, res) => {
  try {
    const { q, sortBy } = req.query;
    const sort = sortBy === "New" ? { postedAt: -1 } : { votes: -1 };

    if (!q) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Query string is required",
        statusCode: 400,
      });
    }

    // find communities
    let communities = await Community.find({
      name: { $regex: q, $options: "i" },
    })
      .sort({ subscribers: -1 })
      .select("_id name")
      .populate({
        path: "admin",
        select: "_id username",
      })
      .populate({
        path: "subscribers",
        select: "_id",
      });
    communities = communities.map((c) => {
      let { _id, name: cname, about, admin, subscribers, createdAt } = c;
      let subscribersCount = c.subscribers.length;

      return {
        _id,
        cname,
        about,
        admin,
        subscribers,
        subscribersCount,
        createdAt,
      };
    });

    // find posts
    let posts = await Post.find({
      $or: [
        {
          title: { $regex: q, $options: "i" },
        },
        {
          content: { $regex: q, $options: "i" },
        },
      ],
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
        votes
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
        votes,
      };
    });

    res.send({
      success: true,
      data: {
        communities,
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
