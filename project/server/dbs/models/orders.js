import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  id: {
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
  },
  name: {
    type: String,
    require: true
  },
  count: {
    type: Number,
    require: true
  },
  total: {
    type: Number,
    require: true
  },
  status: {
    type: Number,
    require: true
  },
  img: {
    type: String,
    require: true
  }
});

export default new mongoose.model('orders', OrderSchema);