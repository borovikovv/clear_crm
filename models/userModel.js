const { Schema, model } = require("mongoose");
const { emailValidate } = require("../utils/authUtils");

const MINIMUM_PASSWORD_LENGTH = 6;
const MAXIMUM_PASSWORD_LENGTH = 32;

const UserModel = new Schema({
   email: {
      type: String,
      require: [true, "Please, provide your email"],
      unique: true,
      validate: {
         validator: function (value) {
            return emailValidate(value);
         },
         message: `Email has not valid!`
      }
   },
   password: {
      type: String,
      require: [true, "A User must be safe"],
      min: [MINIMUM_PASSWORD_LENGTH, `Minimum ${MINIMUM_PASSWORD_LENGTH} sumbols`],
      max: [MAXIMUM_PASSWORD_LENGTH, `Too long, maximum ${MAXIMUM_PASSWORD_LENGTH} sumbols`]
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