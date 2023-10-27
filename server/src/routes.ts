import { Application } from "express";
import moment from "moment";
import * as Sentry from "@sentry/node";
module.exports = function (app: Application) {
  // user routes
  app.use("/user", require("./modules/user/user.routes"));

  //auth routes
  app.use("/auth", require("./modules/authentication/authentication.routes"));

  // default route
  app.get("*", (req, res) => {
    res.send(
      `Welcome to the API! - ${moment().format(
        "MMMM Do YYYY, h:mm:ss a"
      )} - <br/><br/>
      This is the default route - <br/><br/>
      Resuest Informations : <ul> <li>IP : ${req.ip}</li>
      <li>Method : ${req.method}</li>
      <li>URL : ${req.url}</li>
      <li>User Agent : ${req.headers["user-agent"]}</li>
      <li>Headers : ${JSON.stringify(req.headers)}</li> </ul>`
    );
  });

  // notFound route
  app.use((req, res, next) => {
    Sentry.captureException(new Error("Route not found"));
    res.status(404).json({ message: "Route not found" });
  });
};
