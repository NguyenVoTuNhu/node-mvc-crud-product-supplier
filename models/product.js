const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, trim: true, default: '' },
  phone: { type: String, trim: true, default: '' },
  supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
