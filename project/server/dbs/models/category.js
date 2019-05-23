import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  types: {
    type: Array
  },
  areas: {
    type: Array
  },
  city: {
    type: String
  }
});

export default new mongoose.model('category', CategorySchema);