const messageModel = require("../models/messageModel");

module.exports.addMessage = async (req, res) => {
  try {
    const { to, from, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (!!data) {
      return res.json({ msg: "Message added" });
    }
    return res.json({ msg: "Fail to add message" });
  } catch (error) {
    console.log(error);
  }
};
module.exports.getAllMessage = async (req, res) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const finalMessages = messages.map(msg => {
        return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text
        }
    })
    res.json(finalMessages)
  } catch (error) {
    console.log(error);
  }
};
