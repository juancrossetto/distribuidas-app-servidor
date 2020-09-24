const PushNotification = require("../models/PushNotification");
const fetch = require("node-fetch");

exports.getAllTokens = async () => {
  try {
    return await PushNotification.find();
  } catch (error) {
    throw Error("Hubo un error al obtener Tokens");
  }
};

exports.sendPushNotification = async (token, title, body) => {
  try {
    //   return await PushNotification.find();
    const message = {
      to: token,
      sound: "default",
      title: title,
      body: body,
      data: { data: "go data" },
    };
    const resp = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    return resp;
  } catch (error) {
    throw Error(`Hubo un error al enviar la notificación:${error}`);
  }
};
