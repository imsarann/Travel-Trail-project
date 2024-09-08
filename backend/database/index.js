const mongoose = require("mongoose");
mongoose.connect("mongoDB url/travelApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 10,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  });
  const planSchema = new mongoose.Schema({
    title : String,
    todos : String 
  })
  const User = mongoose.model("User", userSchema);
  const Plan = mongoose.model("plan", planSchema) 
  module.exports = {
    User,
    Plan
  };
  