const ActivityLog = require("../models/ActivityLog");

const logActivity = async (user, action, details) => {
  await ActivityLog.create({
    user,
    action,
    details,
  });
};

module.exports = logActivity;
