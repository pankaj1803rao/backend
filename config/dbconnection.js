const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/productapi");
    await mongoose.connect(
      process.env.MONGODB_URL
    );
  } catch (error) {
    console.log(error);
    console.log("Could Not Connect to the Database");
    process.exit(1);
  }
};

module.exports = dbconnect;
