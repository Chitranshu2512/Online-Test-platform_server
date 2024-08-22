// this is auth.middleware.js

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiError} from '../Utils/ApiError.js'

export  const authMiddleware = asyncHandler(async(req, res, next) => {
  try {
      // find token from cookies
      const token = req.cookies?.accessToken
      
      // if token is not present
      if(!token){
          throw new ApiError(401, "No token, authorization denied")
      }
  
      // decode the JWT token
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  
      // find user with the help of decodedToken
      const user = await User.findById(decodedToken._id)
  
      // if user not found
      if(!user){
          throw new ApiError(401, "Invalid Access Token")
      }
      req.user = user
      next();

  } catch (error) {
      throw new ApiError(401, error?.message || "Invalid Access Token")
  }
})


