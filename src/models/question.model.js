// this is question.model.js
import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({

  question: { 
    type: String, 
    required: true 
  },

  options: [String],

  testId:{
    type: Schema.Types.ObjectId,
    ref: "Test"
  },

  marks: { 
    type: Number, 
    required: true 
  }, 

  correctOption: { 
    type: String, 
    required: true 
  },
  
}, {timestamps: true});

const Question = mongoose.model("Question", questionSchema);
export default Question;
