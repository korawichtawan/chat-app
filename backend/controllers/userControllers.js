const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUsername = await Users.findOne({ username });
    if (!!existUsername) {
      return res.json({ status: false, msg: "This username already used" });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await Users.create({
      username: username,
      password: hashedPassword,
    });

    delete password;
    newUser.password = "";
    return res.json({ status: true, newUser });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await Users.findOne({ username });
    if (!existUser) {
      return res.json({
        status: false,
        msg: "Username or Password is incorrect",
      });
    }
    const isCorrectPassword = await bcrypt.compare(
      password,
      existUser.password
    );
    if (!isCorrectPassword) {
      return res.json({
        status: false,
        msg: "Username or Password is incorrect",
      });
    }
    delete existUser.password;
    existUser.password = "";
    return res.json({ status: true, existUser });
  } catch (error) {
    console.log(error);
  }
};

module.exports.setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    await Users.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage:avatarImage,
    });
    const userData = await Users.findOne({_id:userId})
    return res.json({
      isSetImage: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await Users.find({ _id: { $ne: userId } }).select([
      "username","_id","avatarImage"
    ]);
    return res.json(users);
  } catch (error) {
    console.log(error);
  }
};
