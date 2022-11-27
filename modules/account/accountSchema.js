const mongoose = require('mongoose');
const schema = mongoose.Schema;

const accountSchema = new schema({
  username: {type: String},
  password: { type: String },
  group_id: { type: schema.Types.ObjectId,  ref: 'group' },
  added_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, required: true, default: false },
});

module.exports = account = mongoose.model('account', accountSchema);
