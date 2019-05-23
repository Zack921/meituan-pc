import mongoose from 'mongoose';

const ProvinceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

export default new mongoose.model('province', ProvinceSchema);