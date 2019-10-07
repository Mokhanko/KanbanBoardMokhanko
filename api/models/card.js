import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Card = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  img: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: ''
  },
  list: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Card', Card);
