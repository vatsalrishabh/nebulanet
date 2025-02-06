// import mongoose from 'mongoose';

// const connectDb = (handler) => async (req, res) => {
//   if (mongoose.connections[0].readyState) {
//     return handler(req, res); // If already connected, proceed
//   }

//   try {
//     await mongoose.connect('mongodb+srv://Dimpleusername:HvN71w7U9p2tcIEj@cluster0.sduwnxh.mongodb.net/Nebulanet', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//     return handler(req, res); // Proceed once connected
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     res.status(500).json({ message: 'Database connection failed' });
//   }
// };

// export default connectDb;

import mongoose from "mongoose";

// uncomment this if you are using typescript
// declare global {
//   var mongoose: any; // This must be a `var` and not a `let / const`
// }

const MONGODB_URI = 'mongodb+srv://Dimpleusername:HvN71w7U9p2tcIEj@cluster0.sduwnxh.mongodb.net/Nebulanet';

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDb;