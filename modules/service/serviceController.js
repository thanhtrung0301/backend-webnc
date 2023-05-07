const serviceController = {};
const serviceSchema = require("./serviceSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secretOrKey, tokenExpireTime } = require("../../config/keys");
const moment = require("moment");

serviceController.getByHotel = async (req, res, next) => {
  try {
    const { hotel_id } = req.body;

    const services = await serviceSchema.find({ hotel_id });

    return res
      .status(200)
      .json({ success: true, data: services });
  } catch (err) {
    next(err);
  }
};

module.exports = hotelController;
