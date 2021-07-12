const { Schema, model } = require("mongoose");

const UserModel = new Schema({
   email: {
      type: String,
      require: [true, 'Please, provide your email'],
      unique: true
   },
   password: {
      type: String,
      require: [true, 'A User must be safe'],
   },
   isActivated: {
      type: Boolean,
      default: false
   },
   activationLink: {
      type: String,
   }
});

module.exports = model("Users", UserModel);