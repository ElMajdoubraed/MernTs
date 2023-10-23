import { Application } from "express";
import moment from "moment";

module.exports = function (app: Application) {
  app.get("/", (req, res) => {
    res.send(
      `Welcome to the API! - ${moment().format("MMMM Do YYYY, h:mm:ss a")}`
    );
  });

  // user routes
  app.use("/user", require("./modules/user/user.routes"));

  //auth routes
  app.use("/auth", require("./modules/authentication/authentication.routes"));
};
