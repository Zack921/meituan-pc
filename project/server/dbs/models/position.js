import mongoose from 'mongoose';

const PositionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

export default new mongoose.model('position', PositionSchema);