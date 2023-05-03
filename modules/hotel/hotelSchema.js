const mongoose = require('mongoose');
const schema = mongoose.Schema;

const groupSchema = new schema({
  name: {type: String},
  location: {type: String},
  price: {type: Number},
  distanct: {type: Number},
  owner: { type: schema.Types.ObjectId,  ref: 'account' },
  added_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, required: true, default: false },
});

module.exports = group = mongoose.model('group', groupSchema);
