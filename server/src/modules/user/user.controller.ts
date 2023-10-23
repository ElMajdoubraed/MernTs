import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import User from "./user.model";
exports.save = (req: Request, res: Response, next: NextFunction) => {
  const { name, username, password } = req.body;
  const user = new User({ name, username, password });
  user
    .save()
    .then((data: any) => {
      res.json(data.signJwt());
    })
    .catch((err: string) => {
      next(createError(400, err));
    });
};

exports.get = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((data) => {
      if (!data) {
        return next(createError(404, "User not found"));
      }
      res.json(data);
    })
    .catch((err: string) => {
      next(createError(400, err));
    });
};
