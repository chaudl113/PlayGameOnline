import { Request, Response, RequestHandler } from "express";
import { body, check, validationResult } from "express-validator";
import { User } from "../../models/user";
import * as bcrypt from "bcrypt";
import { IncomingHttpHeaders } from "http";

import * as tfa from '../../constants/2fa'
const redis = require("redis");
const JWTR = require("jwt-redis").default;
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379
});
const jwtr = new JWTR(redisClient);


const _saltRounds = 12;
const _jwtSecret = "0.rfyj3n9nzh";
export const getLogin = (req: any, res: Response) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.cookie("secret", 'TUHSiHAsug');
  res.cookie("email", 'HIOWYGIAN');
  return res.render("admin/router/login", {
    title: "Login",
    layout: false,
    errorsLogin: res.locals.error
  });
};




export const postLogin = async (req: Request, res: Response) => {
  await body("email", "Email is not valid").isEmail().custom(email => {
    return User.findOne({ where: { email } }).then(user => {
      if (!user) {
        return Promise.reject("E-mail is not registered");
      }
    });
  }).run(req);
  await body("password", "Password cannot be blank").isLength({ min: 1 }).custom(password => {
    return User.findOne({ where: { email: req.body.email } }).then(async user => {
      if (user) {
        const bc = await bcrypt.compare(password, user.password);
        if (!bc) {
          return Promise.reject("Wrong password");
        }
      }
    });
  }).run(req);
  // eslint-disable-next-line @typescript-eslint/camelcase
  await check("email").normalizeEmail({ gmail_remove_dots: false }).run(req);
  const errors: any = validationResult(req);
  if (!errors.isEmpty()) {
    // res.locals.error_msg = req.flash('error_msg', errors.errors[0].msg);
    const errMsgs = errors.array().map((err: { msg: any; }) => err.msg);
    res.locals.error = req.flash("error", errMsgs);
    return res.redirect("/login");

  }




  let email = req.body.email;
  const u = await User.findOne({ where: { email } });

  if (u.is2FAEnabled) {
    res.cookie("secret", u.secret);
    res.cookie("email", u.email);


    return res.redirect("verify-2fa");
  }
  const id = u.id;
  const roles = u.roles;
  const name = u.username;
  const secret = u.secret
  email = u.email;

  const token = await jwtr.sign({ id, email, roles, name, secret }, _jwtSecret);
  res.cookie("token", token);
  return res.redirect("/");

};


export const getVerify = (req: any, res: Response) => {
  if (req.user) {
    return res.redirect("/");
  }
  return res.render("admin/router/verify2FA", {
    title: "Verify",
    layout: false,
    errorsLogin: res.locals.error
  });
};
export const postVerify = async (req: any, res: Response) => {
  const { otpToken } = req.body
  const secret = req.cookies.secret
  const isValid = tfa.verifyOTPToken(otpToken, secret)
  if (isValid) {
    const email = req.cookies.email
    const u = await User.findOne({ where: { email } });
    const id = u.id;
    const roles = u.roles;
    const name = u.username;
    const secret = u.secret
    const token = await jwtr.sign({ id, email, roles, name, secret }, _jwtSecret);
    res.cookie("token", token);
    res.cookie("secret", 'TUHSiHAsug');
    res.cookie("email", 'HIOWYGIAN');
    return res.redirect("/");
  }
  res.locals.error = req.flash("error", 'Token Error');
  return res.redirect("verify-2fa");
};




export const getSignup = (req: any, res: Response) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("account/signup", {
    title: "Create Account",
    message: req.flash("errors")
  });
};

export const reset = (_req: Request, _res: Response) => {
  _res.render("admin/router/change_password", {
    user: _res.locals.currentUser,
    title: "Change password",
    page_name: "change_password", layout: false
  });
};

export const savePassword = async (_req: Request, _res: Response) => {
  const password = _req.body.password;
  const hash = await bcrypt.hash(password, _saltRounds);
  User.update({ password: hash }, { where: { id: _res.locals.currentUser.id } }).then(rowUpdate => {
    if (rowUpdate[0] === 1) {
      const success = "Đổi mật khẩu thành công";
      _res.locals.success_msg = _req.flash("success_msg", success);
      return _res.redirect("/");
    }
  });
};


export const postSignup = async (req: Request, res: Response) => {
  await body("email").isEmail().withMessage("Email is not valid").custom(email => {
    return User.findOne({ where: { email } }).then(user => {
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    });
  }).run(req);
  await body("password", "Password must be at least 4 characters long").isLength({ min: 4 }).run(req);
  await body("confirmPassword", "Passwords do not match").equals(req.body.password).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // req.flash("errors", errors.array());
    // return res.redirect("/signup");
    return res.json(errors.array());
  }
  const email = req.body.email;
  const password = req.body.password;
  const hash = await bcrypt.hash(password, _saltRounds);
  const u = await User.create({ email, password: hash });
  const data = await getUserById(u!.id);
  return res.json(data);

};

export const postEnable2FA = async (_req: Request, _res: Response) => {
  try {
    const user = _res.locals.currentUser
    if (user) {
      User.update({ is2FAEnabled: true }, { where: { id: user.id } }).then(rowUpdate => {

        if (rowUpdate[0] === 1) {
          const success = "Kích hoạt 2FA thành công";
          _res.locals.success_msg = _req.flash("success_msg", success);
          return _res.redirect("/");
        }
      });
    }

  } catch (error) {
    return _res.json(error)
  }
}

export const getEnable2FAPage = async (_req: Request, _res: Response) => {

  const user = _res.locals.currentUser


  const otpAuth = await tfa.generateOTPToken(user.name, tfa.svName, user.secret)

  const QRCodeImage = await tfa.generateQRCode(otpAuth)

  _res.render("admin/router/2fa", {
    user: _res.locals.currentUser,
    QRCodeImage: QRCodeImage,
    title: "Enable 2FA",
    page_name: "2FA"
  });
}




function getUserById(_id: number) {
  return User.findByPk(_id);
}





export const logout = async (req: Request, res: Response) => {
  const token = getTokenFromHeaders(req.headers) || req.query.token || req.body.token || req.cookies.token || "";
  if (token) {
    try {
      await redisClient.LPUSH("token", token);
      return res.redirect("/login");
    } catch (error) {
      console.log(error);

    }
  }
};



export const tokenGuard: (() => RequestHandler) = (() => async (req, res, next) => {
  try {

    const token = getTokenFromHeaders(req.headers) || req.query.token || req.body.token || req.cookies.token || "";
    if (token) {
      const role = await jwtr.verify(token, _jwtSecret);
      res.locals.currentUser = role;

      redisClient.lrange("token", 0, 99999999, function (err: any, result: any) {
        if (err) {
          console.log(err);
        }
        if (result.indexOf(token) > -1) {
          return res.redirect("/login");
        }
        next();
      });
    } else {
      return res.redirect("/login");

    }
  } catch (error) {
    console.log(error);
  }


});

function getTokenFromHeaders(headers: IncomingHttpHeaders) {
  const header = headers.authorization as string;

  if (!header)
    return header;

  return header.split(" ")[1];
}