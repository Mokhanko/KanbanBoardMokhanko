import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator: v => {
        return v.length > 2;
      },
      message: '{VALUE} is not a valid length!'
    },
    required: [true, 'User name required']
  },
  surname: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator: v => {
        return v.length > 2;
      },
      message: '{VALUE} is not a valid length!'
    },
    required: [true, 'User surname required']
  },
  password: {
    type: String
  },
  avatar: {
    type: String
  }
},{ timestamps: true });

export default mongoose.model('User', User);
