import User from "@/modules/user/user.model";
import { Request, Response, NextFunction } from "express";

const createError = require("http-errors");

exports.login = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user || !user.checkPassword(password)) {
        throw createError(401, "الرجاء التحقق من اسم المستخدم وكلمة المرور");
      }
      res.json(user.signJwt());
    })
    .catch(next);
};

exports.register = (req: Request, res: Response, next: NextFunction) => {
  const { name, username, password } = req.body;
  const data = { name, username, password };

  User.findOne({ username })
    .then((user) => {
      if (user) throw createError(422, "اسم المستخدم موجود مسبقاً");
      return User.create(data);
    })
    .then((user) => {
      res.json(user.signJwt());
    })
    .catch(next);
};
