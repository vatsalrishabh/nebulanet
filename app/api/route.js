import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDb from "./config/db";

const userSchema = new mongoose.Schema({
  serialnum: {
    type: Number,
    required: true,
    unique: true,
  },
  randomNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function checkUserCollection() {
  // Make sure the database connection is ready
  if (mongoose.connection.readyState !== 1) {
    console.log("DB not connected, establishing connection...");
    await connectDb();  // Ensure connection is fully established
  }

  try {
    // Check if the collection exists by directly querying the User model
    const collections = await mongoose.connection.db.listCollections().toArray();
    return collections.some((collection) => collection.name === 'users');
  } catch (error) {
    console.error("Error listing collections:", error);
    return false;
  }
}

export async function GET() {
  try {
    // Ensure that DB connection is established
    await connectDb();

    // Check if the "users" collection exists
    const collectionExists = await checkUserCollection();

    if (!collectionExists) {
      console.log("User collection does not exist, creating it...");
      const serialnum = 1; // Start from 1 if no user exists
      const randomNumber = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
      const name = `User-${serialnum}`; // Name pattern can be changed as needed

      const newUser = new User({
        serialnum,
        randomNumber,
        name,
      });

      await newUser.save();  // Save user to DB
      return NextResponse.json({ message: "User created successfully", user: newUser });
    }

    // Proceed with creating a new user if the collection exists
    const existingUser = await User.findOne({}).sort({ serialnum: -1 }).limit(1); // Get the most recent user based on serialnum

    const serialnum = existingUser ? existingUser.serialnum + 1 : 1;
    const randomNumber = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
    const name = `User-${serialnum}`;

    const newUser = new User({
      serialnum,
      randomNumber,
      name,
    });

    await newUser.save();  // Save user to DB

    return NextResponse.json({ message: "User created successfully", user: newUser });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to connect to the database" }, { status: 500 });
  }
}
