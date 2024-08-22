// this is cron job

import cron from "node-cron";
import Submission from "../models/submission.model.js";
import Question from "../models/question.model.js";
import User from "../models/user.model.js";
import { sendEmail } from "../utils/emailService.js";


// fetch questions for a given list of question IDs
const fetchQuestions = async (questionIds) => {
  return Question.find({
    _id: { $in: questionIds },
  });
};


// evaluate a submission and return the score and max marks
const evaluateSubmission = async (submission) => {
  let score = 0;
  let maxMarks = 0;

  // Fetch questions related to the submission
  const questionIds = submission.selections.map((s) => s.questionID);

  const questions = await fetchQuestions(questionIds);

  // Calculate the score and max marks based on user's selections
  submission.selections.forEach((selection) => {
    const question = questions.find(
      (q) => q._id.toString() === selection.questionID.toString()
    );

    if (question) {
      maxMarks += question.marks;

      if (question.correctOption === selection.option) {
        score += question.marks;
      }
    }
  });

  return { score, maxMarks };
};

// Function to process and evaluate all submissions
export const processSubmissions = async () => {
  try {
    // Fetch all non-deleted submissions
    const submissions = await Submission.find({ isDeleted: false });

    // Iterate over each submission and update the result score
    for (const submission of submissions) {
      const { score, maxMarks } = await evaluateSubmission(submission);
      submission.isDeleted = true;
      submission.resultScore = score;

      await submission.save();

      // Fetch the user associated with the submission
      const user = await User.findById(submission.userID);

      if (user) {
        const emailContent = `
          <h1>Test Evaluation Results</h1>
          <p>Dear ${user.name},</p>
          <p>Your test <strong>${
            submission.testId
          }</strong> has been evaluated. Here are your results:</p>
          <ul>
            <li><strong>Score:</strong> ${score} / ${maxMarks}</li>
            <li><strong>Percentage:</strong> ${(score / maxMarks) * 100}%</li>
          </ul>
          <p>Thank you for taking the test.</p>
          <p>Best Regards,</p>
          <p>CipherSchools</p>
        `;

        // Send the email to the user
        await sendEmail(
          user.email,
          "Your Test Evaluation Results",
          emailContent
        );
      }
    }

    console.log("Evaluation, result storage, and email notifications complete");
  } catch (error) {
    console.error("Error processing submissions:", error);
  }
};

// cron job to run every hour
cron.schedule("* * * * *", () => {
  console.log("Running hourly evaluation job");
  processSubmissions();
});
