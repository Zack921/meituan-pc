import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  detail: {
    type: Array,
    require: true
  },
  cartNo: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  time: {
    type: String,
    require: true
  }
});

export default new mongoose.model('carts', CartSchema);