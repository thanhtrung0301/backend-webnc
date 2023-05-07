const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contractSchema = new schema({
  customer_name: {type: String},
  customer_email: {type: String},
  checkin_time: {type: String},
  service_id: { type: schema.Types.ObjectId,  ref: 'service' },
  checkin: { type: Date },
  checkout: { type: Date },
  price: { type: Number },
  status: { type: String, default: 'UNPAID' },
  added_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, required: true, default: false },
});

module.exports = contract = mongoose.model('contract', contractSchema);
