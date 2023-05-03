const hotelController = {};
const hotelSchema = require("./hotelSchema");
const accountSchema = require("../account/accountSchema")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secretOrKey, tokenExpireTime } = require("../../config/keys");

hotelController.Create = async (req, res, next) => {
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


module.exports = hotelController;
