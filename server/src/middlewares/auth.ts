import { NextFunction, Request, Response } from "express";

import User from "@/modules/user/user.model";
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

exports.authenticated = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["authorization"];
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (
      err: object,
      decoded: {
        id: string;
      }
    ) => {
      if (err) return next(createError(401));
      User.findById(decoded.id)
        .then((user) => {
          if (!user) throw createError(401);
          req.user = user;
          next();
        })
        .catch(next);
    }
  );
};
