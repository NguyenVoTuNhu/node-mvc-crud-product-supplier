const Product = require('../models/product');
const Supplier = require('../models/supplier');
const { validationResult } = require('express-validator');

exports.index = async (req, res) => {
  try {
    const products = await Product.find().populate('supplierId').sort({ createdAt: -1 });
    res.render('products/index', { products });
  } catch (err) { res.status(500).send('Server error'); }
};

exports.newForm = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render('products/new', { suppliers, errors: null, data: {} });
  } catch (err) { res.status(500).send('Server error'); }
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  const suppliers = await Supplier.find();
  if (!errors.isEmpty()) return res.render('products/new', { suppliers, errors: errors.array(), data: req.body });

  try {
    await Product.create(req.body);
    res.redirect('/products');
  } catch (err) { res.status(500).send('Server error'); }
};

exports.show = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplierId');
    if (!product) return res.status(404).send('Product not found');
    res.render('products/show', { product });
  } catch (err) { res.status(500).send('Server error'); }
};

exports.editForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    if (!product) return res.status(404).send('Product not found');
    res.render('products/edit', { product, suppliers, errors: null });
  } catch (err) { res.status(500).send('Server error'); }
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  const suppliers = await Supplier.find();
  if (!errors.isEmpty()) {
    const product = { _id: req.params.id, ...req.body };
    return res.render('products/edit', { product, suppliers, errors: errors.array() });
  }
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/products');
  } catch (err) { res.status(500).send('Server error'); }
};

exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) { res.status(500).send('Server error'); }
};
