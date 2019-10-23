const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please tell Us your user name"]
  },
  email: {
    type: String,
    required: [true, "Please Provide a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provde a valid Email"]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "password length must be grater or equal to 8"],
    //we are using select here because in case query password will be query
    // or if you have to query you select it select("+password");
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords are not the same!"
    }
  }
});

userSchema.pre("save", async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm
  this.passwordConfirm = undefined;
  console.log(this.passwordConfirm);
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
