const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kumartupe_db_user:5FOVbgfo8DHbODVH@namastenode.e9b75nr.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
