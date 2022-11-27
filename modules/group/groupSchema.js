const mongoose = require('mongoose');
const schema = mongoose.Schema;

const groupSchema = new schema({
  group_name: {type: String},
  owner: { type: schema.Types.ObjectId,  ref: 'account' },
  added_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, required: true, default: false },
});

module.exports = group = mongoose.model('group', groupSchema);
