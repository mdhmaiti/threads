import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status


// when building a big application always always set a differnt custom function to connect rather than to use the ". connect " directly.
// otherwiseu will find problems if there is a typo error regaring the database and u are skrewed .
// note : it is data base so always use the promises .

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries, it saves the new input but ignores it , ti provies flexibility.
  // if it was set to the "throw" it will provide an error, the "true " is for the scilent handling.
  mongoose.set("strictQuery", true);
  

  if (!process.env.MONGODB_URL) return console.log("Missing MongoDB URL");//  return the colsole log and exit from the whole process.

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {
    console.log("MongoDB connection already established");
    return;// return the console log and move to the previous flow.
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true; // Set the connection status to true
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};