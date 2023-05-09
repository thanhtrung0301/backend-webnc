const contractController = {};
const contractSchema = require("./contractSchema");
const { secretOrKey, tokenExpireTime } = require("../../config/keys");
const moment = require("moment");
const hotelSchema = require("../hotel/hotelSchema");

contractController.GetOne = async (req, res, next) => {
  try {
    const contract = await contractSchema
      .findById(req.params.id)
      .populate("hotel_id");
    console.log("🚀 ~ file: contractController.js:12 ~ contractController.GetOne= ~ contract:", contract)

    if (contract) {
      return res.status(200).json({ success: true, data: contract });
    }
    return res.status(200).json({ success: false, msg: "Không tìm thấy" });
  } catch (err) {
    next(err);
  }
};

contractController.Create = async (req, res, next) => {
  try {
    const contract = new contractSchema({
      ...req.body,
      checkin_time: moment(req.body.checkin_time).format("HH:MM:ss"),
      checkin: moment(req.body.checkin, "DD/MM/YYYY"),
      checkout: moment(req.body.checkout, "DD/MM/YYYY"),
      amount: req.body.hotel.price,
      customer_name: req.body.first_name + ' ' + req.body.last_name,
      customer_email: req.body.email,
    });
      console.log("🚀 ~ file: contractController.js:31 ~ contractController.Create= ~ req.body:", req.body)

    await contract.save();

    return res.status(200).json({
      success: true,
      data: { contract_id: contract._id },
      msg: "Đã tạo hợp đồng thành công",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = contractController;
