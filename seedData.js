import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/user.model.js'
import Test from './src/models/test.model.js';
import Question from './src/models/question.model.js';
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI);

// Seed function
async function seedDatabase() {

  try {

    // Clear existing data
    await User.deleteMany({});
    await Test.deleteMany({});
    await Question.deleteMany({});

    // Create a mock user
    const mockUser = await User.create({
      name: 'Chitranshu Kushwaha',
      email: 'chitranshukushwaha01@gmail.com',
      password:'cipherSchool'
    });

    if(!mockUser){
      console.log("error, while registering mock user")
    } 
    else console.log("user-seeded")

    // Create a test
    const test = await Test.create({
      title: 'Sample Test',
      description: 'This is a sample test with 10 questions.',
    });
    
    if(!test){
      console.log("error, while registering mock test")
    } 
    else console.log("test-seeded")
    

    // Array of questions with options and correct answers
    const questionsData = [
      {
        question: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
        correctOption: 'Paris',
        marks: 5,
        testId: test._id,
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        correctOption: 'Mars',
        marks: 5,
        testId: test._id,
      },
      {
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctOption: 'Pacific Ocean',
        marks: 5,
        testId: test._id,
      },
      {
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'O2', 'CO2', 'NaCl'],
        correctOption: 'H2O',
        marks: 5,
        testId: test._id,
      },
      {
        question: 'Which country is known as the Land of the Rising Sun?',
        options: ['China', 'Japan', 'Thailand', 'India'],
        correctOption: 'Japan',
        marks: 5,
        testId: test._id,
      },
      {
        question: 'What is the smallest prime number?',
        options: ['1', '2', '3', '5'],
        correctOption: '2',
        marks: 5,
        testId: test._id,
      },
      {
        question: 'Who wrote "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Charles Dickens', 'Mark Twain', 'Leo Tolstoy'],
        correctOption: 'William Shakespeare',
        marks: 5,
        testId: test._id,
      },
      {
        question: 'What is the speed of light?',
        options: ['300,000 km/s', '150,000 km/s', '100,000 km/s', '500,000 km/s'],
        correctOption: '300,000 km/s',
        marks: 5,
        testId: test._id,
      },
      {
        question: 'Which planet has the most moons?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        correctOption: 'Saturn',
        marks: 5,
        testId: test._id,
      },
      {
        question: 'What is the largest mammal on Earth?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctOption: 'Blue Whale',
        marks: 5,
        testId: test._id,
      },
    ];


    // Insert questions into the database and associate them with the test
    const questions = await Question.insertMany(questionsData);

    // update the test schema
    test.questions = questions.map((q) => q._id);
    await test.save();

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } 

  catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }

}

seedDatabase();
