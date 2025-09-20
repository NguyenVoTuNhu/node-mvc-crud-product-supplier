const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         name: { type: string }
 *         address: { type: string }
 *         phone: { type: string }
 *         supplierId: { type: string }
 *       required: [name, supplierId]
 */

/**
 * @swagger
 * /products/api:
 *   get:
 *     tags: [Products]
 *     summary: Get list of products (JSON)
 *     responses:
 *       200:
 *         description: list of products
 */
router.get('/api', async (req, res) => {
  const Product = require('../models/product');
  const list = await Product.find().populate('supplierId').sort({ createdAt: -1 });
  res.json(list);
});

// Web pages
router.get('/', productController.index);
router.get('/new', productController.newForm);
router.post('/', 
  body('name').notEmpty().withMessage('Name is required'),
  body('supplierId').notEmpty().withMessage('Supplier is required'),
  productController.create
);
router.get('/:id', productController.show);
router.get('/:id/edit', productController.editForm);
router.put('/:id', 
  body('name').notEmpty().withMessage('Name is required'),
  body('supplierId').notEmpty().withMessage('Supplier is required'),
  productController.update
);
router.delete('/:id', productController.delete);

module.exports = router;
