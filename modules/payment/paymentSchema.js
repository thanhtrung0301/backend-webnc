const mongoose = require('mongoose');
const schema = mongoose.Schema;

const paymentSchema = new schema({
  contract_id: { type: schema.Types.ObjectId, ref: 'contract' },
  // customer_id: { type: schema.Types.ObjectId, ref: 'customers' },
  // voucher_code_id: { type: schema.Types.ObjectId, ref: 'vouchercode' },
  payment_method_id: { type: schema.Types.ObjectId, ref: 'payment_method' },
  params: { type: Object },
  response: { type: Object },
  payment_url: { type: String },
  payment_deeplink: { type: String },
  status: { type: String, default: 'UNPAID' }, // PAID, UNPAID, FAILED
  response_code: { type: String }, // PAID, UNPAID, FAILED
  payment_info: { type: Object },
  amount: { type: Number }, // so tien khach dua
  is_deleted: { type: Boolean, required: true, default: false },
  deleted_at: { type: Date },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
});

module.exports = payment = mongoose.model('payment', paymentSchema);
