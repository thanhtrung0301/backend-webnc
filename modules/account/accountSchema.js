const mongoose = require('mongoose');
const schema = mongoose.Schema;

const accountSchema = new schema({
  fullname: {type: String},
  email: {type: String},
  username: {type: String},
  password: { type: String },
  reset_at: { type: Date },
  added_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, required: true, default: false },
});

module.exports = account = mongoose.model('account', accountSchema);
