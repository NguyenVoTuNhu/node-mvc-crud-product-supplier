const Supplier = require('../models/supplier');
const Product = require('../models/product');
const { validationResult } = require('express-validator');

exports.index = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.render('suppliers/index', { suppliers });
  } catch (err) { res.status(500).send('Server error'); }
};

exports.newForm = (req, res) => {
  res.render('suppliers/new', { errors: null, data: {} });
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.render('suppliers/new', { errors: errors.array(), data: req.body });

  try {
    await Supplier.create(req.body);
    res.redirect('/suppliers');
  } catch (err) { res.status(500).send('Server error'); }
};

exports.show = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).send('Supplier not found');
    const products = await Product.find({ supplierId: supplier._id });
    res.render('suppliers/show', { supplier, products });
  } catch (err) { res.status(500).send('Server error'); }
};

exports.editForm = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).send('Supplier not found');
    res.render('suppliers/edit', { supplier, errors: null });
  } catch (err) { res.status(500).send('Server error'); }
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const supplier = { _id: req.params.id, ...req.body };
    return res.render('suppliers/edit', { supplier, errors: errors.array() });
  }
  try {
    await Supplier.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/suppliers');
  } catch (err) { res.status(500).send('Server error'); }
};

exports.delete = async (req, res) => {
  try {
    // delete its products (or you can forbid deletion if products exist)
    await Product.deleteMany({ supplierId: req.params.id });
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
  } catch (err) { res.status(500).send('Server error'); }
};
