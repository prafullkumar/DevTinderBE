const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../midelewares/userAuth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserID",
  userAuth,
  async (req, res) => {
    try {
      const ALLOWED_STATUS = ["ignored", "interested"];
      const fromUserID = req.user._id;
      const status = req.params.status;
      const toUserID = req.params.toUserID;

      const isValidUser = await User.findById(toUserID);

      if (!isValidUser) {
        return res.status(400).json({
          message: "Invalid User!",
          data: { status: 400 },
        });
        //throw new Error("Invalid User");
      }

      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({
          message: "Invalid status " + status,
          status: 400,
        });
      }

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserID, toUserID },

          { fromUserID: toUserID, toUserID: fromUserID },
        ],
      });

      if (existingRequest) {
        return res.status(400).json({
          message: "Request already exist " + status,
          status: 400,
        });
      }
      const data = new ConnectionRequest({
        fromUserID,
        status,
        toUserID,
      });

      const requestData = await data.save();

      res.json({
        message: "Request Send",
        data: requestData,
      });
    } catch (err) {
      res.status(400).send("ERROR 1" + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:Status/:requestID",
  userAuth,
  async (req, res) => {
    try {
      const Status = req.params.Status;
      const user_id = req.user._id;

      const req_id = req.params.requestID;
      const ALLOWED_STATUS = ["accepted", "rejected"];
      const isValidStatus = ALLOWED_STATUS.includes(Status);
      if (!isValidStatus) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }
      const getRequestedConnection = await ConnectionRequest.findOne({
        toUserID: user_id,
        status: "interested",
        _id: req_id,
      });

      if (getRequestedConnection) {
        getRequestedConnection.status = Status;
        const data = await getRequestedConnection.save();
        return res.status(200).json({
          message: `Request ${Status} successfully.`,
          data: data,
        });
      } else {
        return res.status(400).json({
          message: "No connection found!",
        });
      }
    } catch (err) {
      res.status(400).send("ERROR " + err.message);
    }
  }
);

module.exports = requestRouter;
