import { Application, Errback, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import express from "express";
import path from "path";
import logger from "morgan";
import dbConnect from "./database";

interface Error extends Errback {
  status?: number;
  name?: string;
  message?: string;
}

interface RequestWithUser extends Request {}

module.exports = async function (app: Application) {
  const env = app.get("env");
  app.use(express.json());
  dbConnect();
  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(logger("dev"));
  app.use(express.static(path.join(__dirname, "../../public")));

  app.use(
    (err: Error, req: RequestWithUser, res: Response, next: NextFunction) => {
      if (
        err.name === "MongoError" ||
        err.name === "ValidationError" ||
        err.name === "CastError"
      ) {
        err.status = 422;
      }
      if (req.get("accept")?.includes("json")) {
        res
          .status(err.status || 500)
          .json({ message: err.message || "some error eccured." });
      } else {
        res
          .status(err.status || 500)
          .sendFile(path.join(__dirname, "public", "index.html"));
      }
    }
  );
};
