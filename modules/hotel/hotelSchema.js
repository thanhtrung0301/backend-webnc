const mongoose = require('mongoose');
const schema = mongoose.Schema;

const hotelSchema = new schema({
  name: {type: String},
  location: {type: String},
  address: {type: String},
  properties: [{type: String}],
  special_room: {},
  description: {type: String},
  price_per_night: {type: Number},
  distance: {type: Number},
  added_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, required: true, default: false },
  images: [],
});

module.exports = hotel = mongoose.model('hotel', hotelSchema);
