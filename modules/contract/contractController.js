const contractController = {};
const contractSchema = require("./contractSchema");
const { secretOrKey, tokenExpireTime } = require("../../config/keys");

contractController.Create = async (req, res, next) => {
  try {
    const contract = new contractSchema(req.body);

    await contract.save();

    return res
      .status(200)
      .json({ success: true, msg: "Đã tạo hợp đồng thành công" });
  } catch (err) {
    next(err);
  }
};

module.exports = hotelController;
