import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Card = new Schema({
  title: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  update: {
    type: Date,
  },
  img: {
    type: String,
    default: null
  },
  description: {
    type: String
  },
  list: {
    type: String
  }
},{timestamps: true});

export default mongoose.model('Card', Card);
