const accountController = {};
const accountSchema = require("./accountSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secretOrKey, tokenExpireTime } = require("../../config/keys");

accountController.Register = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    let account = await accountSchema.findOne({ username, is_deleted: false });
    console.log("account", account);
    if (account) {
      return res
        .status(200)
        .json({ success: true, msg: "Tên đăng nhập đã được sử dụng" });
    }
    account = new accountSchema({
      username,
    });

    let salt = await bcrypt.genSalt(10);
    let hashpw = await bcrypt.hash(password, salt);

    account.password = hashpw;
    account = await account.save();

    return res.status(200).json({ success: true, msg: "Đăng ký thành công" });
  } catch (err) {
    next(err);
  }
};

accountController.Login = async (req, res, next) => {
  try {
    console.log("body", req.body);
    let errors = {};
    const {
      body: { username, password },
    } = req;
    accountSchema
      .findOne({
        username,
        is_deleted: false,
      })
      .then((account) => {
        console.log("account", account);
        if (!account) {
          return res.status(401).json({ message: "Không tìm thấy tài khoản" });
        }

        // Check Password
        bcrypt.compare(password, account.password).then(async (isMatch) => {
          if (isMatch) {
            //check password length > 6 character => change password
            /*  if(!otherHelper.isPassword(password)){
                            errors.force_change_password = 'force_change_password';
                            return otherHelper.sendResponse(res, httpStatus.OK, false, null, errors, errors.force_change_password, null);
                        }*/

            // Create JWT payload

            let payload = {
              id: account._id,
              username: account.username,
              email: account.email,
              added_at: account.added_at,
            };

            account = await account.save();

            // Sign Token
            let token = await jwt.sign(payload, secretOrKey, {
              expiresIn: tokenExpireTime,
            });

            // TODO TEST
            return res.status(200).json({ success: true, token: token, payload: payload });
            // jwt.sign(
            //     payload,
            //     secretOrKey, {
            //     expiresIn: tokenExpireTime,
            // },
            //     (err, token) => {
            //         console.log('login', err, succes)
            //         accountloginlogs.addloginlog(req, token, next);
            //         return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
            //     },
            // );
          } else {
            errors.password = "Sai mật khẩu. Xin vui lòng thử lại";
            return otherHelper.sendResponse(
              res,
              httpStatus.OK,
              false,
              null,
              errors,
              errors.password,
              null
            );
          }
        });
      });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

module.exports = accountController;
