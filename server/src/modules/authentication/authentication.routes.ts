import express from "express";
const router = express.Router();

const controller = require("./authentication.controller");

router.post("/", controller.login);

router.post("/register", controller.register);

module.exports = router;
