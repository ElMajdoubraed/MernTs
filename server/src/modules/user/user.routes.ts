import express from "express";
const router = express.Router();

const controller = require("./user.controller");

router.post("/save", controller.save);
router.get("/get", controller.get);

module.exports = router;
