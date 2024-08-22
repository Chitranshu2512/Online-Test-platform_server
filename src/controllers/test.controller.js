// this is test.controller.js

import Test from '../models/test.model.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiError } from '../Utils/ApiError.js'
import { ApiResponse } from '../Utils/ApiResponse.js';
import Question from '../models/question.model.js';


export const getTests = asyncHandler(async(req, res) => {
    const {testId} = req.body

    try {
        const test = await Test.findOne({
        $and: [{testId}, {isDeleted: false}]
    }).select("-questions")

    return res.status(200)
    .json(new ApiResponse(200, test, "test is available"))


    } catch (error) {
      throw new ApiError(500, "Test is not available")
    }

})



export const attemptTest = asyncHandler(async(req, res) => {
  const {testId} = req.body
  const user = req.user
  try {
    const test = await Test.findOne({
      testId,
      isDeleted: false
    }).populate('questions');
    console.log("Test document:", test);
    
  return res.status(200)
  .json(new ApiResponse(200, {test, user}, "Start attempting your test"))


  } catch (error) {
    throw new ApiError(500, "Test is not available")
  }

})
