import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin:{
      type: Boolean,
      default: false 
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function(email, password){
 if(!email || !password){
    throw new Error("Email or password is not provided");
 }
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const user = await this.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }
  
    const salt = await bcrypt.genSalt(10);
    console.log("Password:", password);

    const hash = await bcrypt.hash(password, salt);
  
    const newUser = await this.create({ email, password: hash });
  
    return newUser;
  };

  userSchema.statics.login = async function(email, password){
    if(!email || !password){
      throw new Error("Email or password is not provided");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }
    return user;
  };

export const User = mongoose.model("User", userSchema);
