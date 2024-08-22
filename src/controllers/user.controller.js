// this is user.controller.js
import User from '../models/user.model.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiError } from '../Utils/ApiError.js'
import { ApiResponse } from '../Utils/ApiResponse.js';


// login controller
export const login = asyncHandler(async(req, res) => {

  const{email, password} = req.body

  if(!email || !password){
    throw new ApiError(400, "email and password are required")
  }

  const user = await User.findOne({email})

  if(!user){
    throw new ApiError(404, "User does not exist")
  }

  // decrypt the password
  const isPasswordvalid = await user.isPasswordCorrect(password)

  // check password
  if(!isPasswordvalid){
    throw new ApiError(404, "Bad Credentials")
  }

  const accessToken = user.generateAccessToken()
  const loggedInUser = await User.findById(user._id).select("-password")

  // declare a option obj to send it with cookies as response
    const options = {
        httpOnly: true,
        secure: true    
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(200, {loggedInUser,accessToken}, "user logged in successfully")
    )
    
});
