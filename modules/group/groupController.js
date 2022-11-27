const groupController = {};
const groupSchema = require("./groupSchema");
const accountSchema = require("../account/accountSchema")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secretOrKey, tokenExpireTime } = require("../../config/keys");

groupController.Create = async (req, res, next) => {
  try {
    let { group_name, account_id } = req.body;
    console.log("account_id", account_id)

    let group = await groupSchema.findOne({ group_name });
    if (group) {
      return res
        .status(200)
        .json({ success: true, msg: "Nhóm này đã tồn tại" });
    }
    group = new groupSchema({
      group_name,
      owner: account_id,
    });

    group = await group.save();

    return res
      .status(200)
      .json({ success: true, msg: "Đã tạo nhóm thành công" });
  } catch (err) {
    next(err);
  }
};
groupController.Join = async (req, res, next) => {
  try {
    let group = await accountSchema.findByIdAndUpdate(req.user._id, {
      $set: { group_id: req.body.group_id },
    });
  

    return res
      .status(200)
      .json({ success: true, group, msg: "Đã tham gia nhóm thành công" });
  } catch (err) {
    next(err);
  }
};

groupController.ShowAll = async (req, res, next) => {
  try {
    let groups = await groupSchema.find({});

    return res.status(200).json({ groups });
  } catch (err) {
    next(err);
  }
};

module.exports = groupController;
