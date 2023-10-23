//@ts-nocheck
import express, { Application } from "express";
import dotenv from "dotenv";
import http from "http";
import "module-alias/register";
import socketHadnler from "./socket-handler";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4000;

require("./config/express")(app);
require("./routes")(app);

// Create HTTP server.
const server = http.createServer(app);

// Create socket connection
socketHadnler(server);

// Start server
server.listen(port, function () {
  console.log(
    "Express server listening on %d, in %s mode !",
    port,
    app.get("env")
  );
});
