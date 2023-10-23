import { Server } from "socket.io";
const socketio = require("socket.io");

export default function socketHadnler(server: Server) {
  const io = socketio(server);
  io.use((socket: any, next: any) => {
    const token = socket.handshake.query.token;
    if (token) {
      console.log(token);
      next();
    } else {
      next(new Error("unauthorized"));
    }
  });
  io.on("connection", (socket: any) => {
    console.log(`Socket ${socket.id} connected`);

    socket.on("sendMessage", (message: any) => {
      io.emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
}
