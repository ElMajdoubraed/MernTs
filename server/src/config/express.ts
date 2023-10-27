import { Application, Errback, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import express from "express";
import path from "path";
import logger from "morgan";
import dbConnect from "./database";
import ejs from "ejs";
import passport from "passport";
import session from "express-session";
import * as Sentry from "@sentry/node";

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
  app.use(logger(env));

  // ejs config
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(express.static("uploads"));
  ejs.delimiter = "?";

  // error handler
  app.use(
    (err: Error, req: RequestWithUser, res: Response, next: NextFunction) => {
      if (
        err.name === "MongoError" ||
        err.name === "ValidationError" ||
        err.name === "CastError"
      ) {
        console.error("Express config error : ", err);
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

  // sentry config
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({
        app,
      }),
    ],
  });
  app.use(
    Sentry.Handlers.requestHandler({
      serverName: false,
      user: ["email"],
    })
  );
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler());

  // session config
  app.use(
    session({
      secret: "P@ssw0rd:!@#",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );

  // passport config
  app.use(passport.initialize());
  app.use(passport.session());
};
