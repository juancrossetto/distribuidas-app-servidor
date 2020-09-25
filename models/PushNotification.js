const mongoose = require("mongoose");

const PushNotificationSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  token: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
});

module.exports = mongoose.model("PushNotification", PushNotificationSchema);
