const Notification = require("../models/Notification");

const createNotification = async (user, title, message) => {
  await Notification.create({
    user,
    title,
    message,
  });
};

module.exports = createNotification;
