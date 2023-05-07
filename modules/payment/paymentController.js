const paymentController = {};
const paymentSchema = require("./paymentSchema");
const { secretOrKey, tokenExpireTime } = require("../../config/keys");
const contractSchema = require("../contract/contractSchema");

paymentController.Create = async (req, res, next) => {
  
  try {
    const { contract_id, payment_method_id, payment_info, amount } = req.body;
    console.log("cutomer", req.body);
    const one = await contractSchema.findOne({ _id: contract_id });

    let payment = new paymentSchema({
      contract_id,
      payment_method_id,
      status: "UNPAID",
      payment_info,
      amount: one.price,
    });
    payment = await payment.save();
    await contractSchema.findByIdAndUpdate(contract_id, {
      $set: {
        status: 'PAID',
      },
    });
    // const one = await orderController.getOneOrder({ _id: order_id });
    const vnpUrl = `/checkout/payment-complete?payment_id=${payment._id}`;

    return res.status(200).json({
      success: true,
      data: vnpUrl,
      msg: "Đã tạo hợp đồng thành công",
    });
   
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = paymentController;
