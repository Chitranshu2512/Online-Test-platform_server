// this is test.model.js
import mongoose, { Schema } from 'mongoose';

const testSchema = new Schema({

  title: { 
    type: String, 
    required: true 
  },

  description: { 
    type: String 
  },
  
  questions: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Question' 
    }
  ],

  isDeleted: { 
    type: Boolean, 
    default: false 
  },
  
}, {timestamps: true});

const Test = mongoose.model('Test', testSchema);
export default Test;
