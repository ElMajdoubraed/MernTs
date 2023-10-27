import express from "express";
const router = express.Router();
const passport = require("passport");

require("./strategies/google.strategie");
require("./strategies/github.strategie");

const controller = require("./authentication.controller");

router.post("/", controller.login);

router.post("/register", controller.register);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/?auth=success",
    failureRedirect: "/?auth=failure",
  })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/?auth=success",
    failureRedirect: "/?auth=failure",
  })
);

module.exports = router;
