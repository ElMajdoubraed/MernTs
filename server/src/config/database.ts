import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// mongodb environment variables
const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached: any = global;
async function dbConnect() {
  if (cached.conn) return cached.conn;
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
  };
  cached.promise = mongoose.connect(MONGODB_URI as string, opts);
  cached.conn = await cached.promise
    .then(() => console.log("Connected to DB"))
    .catch((err: object) => console.log(err));
  return cached.conn;
}

export default dbConnect;
