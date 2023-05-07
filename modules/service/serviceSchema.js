const mongoose = require('mongoose');
const schema = mongoose.Schema;

const serviceSchema = new schema({
  name: {type: String},
  interior: [{type: String}],
  hotel_id: { type: schema.Types.ObjectId,  ref: 'hotel' },
  added_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, required: true, default: false },
  images: [],
});

module.exports = service = mongoose.model('service', serviceSchema);
