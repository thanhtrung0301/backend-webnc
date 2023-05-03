const hotelController = {};
const hotelSchema = require("./hotelSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secretOrKey, tokenExpireTime } = require("../../config/keys");
const moment = require("moment");

hotelController.Search = async (req, res, next) => {
  try {
    let { checkin, checkout, adult, children, room, city } = req.body;
    console.log(
      "🚀 ~ file: hotelController.js:11 ~ hotelController.Search= ~ req.body:",
      req.body
    );

    const payload = [];
    let hotels = await hotelSchema.find({ location: city });
    for (let hotel of hotels) {
      const diff = moment(checkout, "DD/MM/YYYY").diff(
        moment(checkin, "DD/MM/YYYY"),
        "days"
      );

      payload.push({
        ...hotel.toObject(),
        price: hotel.price_per_night * diff,
      });
    }

    console.log(
      "🚀 ~ file: hotelController.js:18 ~ hotelController.Search= ~ hotel:",
      payload
    );
    return res
      .status(200)
      .json({ success: true, data: payload, msg: "Đã tạo nhóm thành công" });
  } catch (err) {
    next(err);
  }
};

hotelController.Create = async (req, res, next) => {
  try {
    const hotel = new hotelSchema({
      name: "Horizon seawiew Apartment in Vung Tau",
      distance: 1.2,
      price_per_night: 1008000,
      address: "2 Lê Hồng Phong, Vung Tau, Vietnam",
      properties: [
        "115 m² Size",
        "Kitchen",
        "City view",
        "Garden",
        "Pet friendly",
      ],
      special_room: {
        name: "Two-Bedroom Apartment",
        description:
          "Entire apartment • 2 bedrooms • 2 bathrooms • 1 kitchen • 115m² \n5 beds (3 queens, 2 futons)",
      },
      description:
        "Featuring a garden, a shared lounge, and a bar, Horizon seawiew Apartment in Vung Tau has accommodations in Vung Tau with free WiFi and sea views. This apartment provides air-conditioned accommodations with a balcony. \nThe apartment is equipped with 2 bedrooms, 2 bathrooms, bed linen, towels, a flat-screen TV, a dining area, a fully equipped kitchen, and a terrace with city views. For added convenience, the property can provide towels and bed linen for an extra charge. \nWith staff speaking English, Vietnamese and Chinese, non-stop advice is available at the reception.\nA casino is available on site and both hiking and cycling can be enjoyed within close proximity of the apartment.\nBack Beach is a 4-minute walk from Horizon seawiew Apartment in Vung Tau, while Nghinh Phong Cape is 3.4 km from the property. The nearest airport is Vung Tau, 3.1 km from the accommodation, and the property offers a paid airport shuttle service.",
      location: "Vũng Tàu",
      images: [
        "https://cf.bstatic.com/xdata/images/hotel/square600/453010123.webp?k=7ba28c25cd03f7379d011ef738ec07355dc383571f3ea68398630f60bca82a5e&o=&s=1",
      ],
    });

    await hotel.save();

    return res
      .status(200)
      .json({ success: true, msg: "Đã tạo nhóm thành công" });
  } catch (err) {
    next(err);
  }
};

module.exports = hotelController;
