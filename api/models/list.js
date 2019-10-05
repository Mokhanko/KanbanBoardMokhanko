import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const List = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  }
},{timestamps: true});

export default mongoose.model('List', List);
