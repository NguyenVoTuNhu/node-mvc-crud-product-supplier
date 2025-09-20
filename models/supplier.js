const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplierSchema = new Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, trim: true, default: '' },
  phone: { type: String, trim: true, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
