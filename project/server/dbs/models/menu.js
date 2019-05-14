import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
  menu: {
    type: Array,
    require: true
  }
});

export default new mongoose.model('menu', MenuSchema);