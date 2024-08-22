// this is submission.controller.js

import Submission from "../models/submission.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";


export const submitTest = asyncHandler(async (req, res) => {

  const { testId, userID, selections, endedAt } = req.body;
  
  const submission = await Submission.create({
    userID,
    testId,
    selections,
    endedAt,
  });

  const submittedResponse = await Submission.findById(submission._id);

  // check if submission registered ssuccessfully
  if (!submittedResponse) {
    throw new ApiError(500, "something went wrong while submitting the test");
  }

  return res.status(200)
  .json(new ApiResponse(200, null, "Test submitted successfully"))
});

