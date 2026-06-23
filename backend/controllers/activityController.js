const asyncHandler = require("express-async-handler");

const ActivityLog = require("../models/ActivityLog");

const getActivities = asyncHandler(async (req, res) => {
  const logs = await ActivityLog.find()
    .populate("user", "name email")
    .sort({
      createdAt: -1,
    })
    .limit(20);
  res.json(logs);
});

module.exports = {
  getActivities,
};
