import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  value: {
    type: Array,
    require: true
  }
});

export default new mongoose.model('cities', CitySchema);