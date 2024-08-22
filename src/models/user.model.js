// this is user.model.js

import mongoose, { Schema } from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema = new Schema({

  name: { 
    type: String, 
    required: true,
    trim: true
  },

  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowecase: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  isDeleted: { 
    type: Boolean, 
    default: false 
  }

}, {timestamps: true});


userSchema.pre("save", async function(next){

  if(!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()

});


userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function(){
  
  return jwt.sign({
      _id: this._id,
      email: this.email,
  },

  process.env.ACCESS_TOKEN_SECRET,

  {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
)
}


const User = mongoose.model('User', userSchema);
export default User;