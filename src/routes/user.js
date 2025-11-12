const express = require("express");
const userRouter = express.Router();
const userAuth = require("../midelewares/userAuth");
const connectionRequest = require("../models/connectionRequest");
const { connection, set } = require("mongoose");
const User = require("../models/user");

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user._id;

    const getrequestedData = await connectionRequest
      .find({
        toUserID: loggedinUser,
        status: "interested",
      })
      .populate("fromUserID", "firstName lastName skills");

    if (!getrequestedData) {
      return res.status(400).json({
        message: "request not found!",
      });
    }

    // const requestUserData = getrequestedData.map((item) => {
    //   return item.fromUserID;
    // });
    res.json({
      message: "Record found successfully!",
      data: getrequestedData,
    });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user._id;
    const connections = await connectionRequest
      .find({
        $or: [{ fromUserID: loggedinUser }, { toUserID: loggedinUser }],
        status: "accepted",
      })
      .populate("fromUserID", "firstName lastName skills _id")
      .populate("toUserID", "firstName lastName skills _id");

    if (connections) {
      const connectionList = connections.map((connection) => {
        if (connection.fromUserID._id.toString() === loggedinUser.toString()) {
          return connection.toUserID;
        }
        return connection.fromUserID;
      });

      res.json({
        message: "Connections fetched successfully",
        data: connectionList,
      });
    } else {
      res.status(400).json({
        message: "No connections found!",
      });
    }
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    loggedinUser = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const ConnectionUserList = await connectionRequest
      .find({
        $or: [{ fromUserID: loggedinUser }, { toUserID: loggedinUser }],
      })
      .select("fromUserID toUserID ");

    const hiddenUserIds = new Set();
    ConnectionUserList.forEach((element) => {
      hiddenUserIds.add(element.fromUserID.toString());
      hiddenUserIds.add(element.toUserID.toString());
    });

    const feedData = await User.find({
      $and: [
        { _id: { $ne: loggedinUser } },
        { _id: { $nin: Array.from(hiddenUserIds) } },
      ],
    })
      .select(" firstName lastName skills photo")
      .skip(skip)
      .limit(limit);

    res.json({
      message: "Feed fetched successfully",
      data: feedData,
    });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

module.exports = userRouter;
