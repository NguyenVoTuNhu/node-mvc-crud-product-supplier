const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { body } = require('express-validator');

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Hiển thị trang danh sách sản phẩm (Web)
 *     responses:
 *       200:
 *         description: Trang danh sách sản phẩm
 *
 *   post:
 *     tags: [Products]
 *     summary: Tạo sản phẩm mới (Web form)
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - supplierId
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               supplierId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sản phẩm được tạo thành công
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Hiển thị chi tiết sản phẩm (Web)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết sản phẩm
 *
 *   put:
 *     tags: [Products]
 *     summary: Cập nhật sản phẩm
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               supplierId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *
 *   delete:
 *     tags: [Products]
 *     summary: Xóa sản phẩm
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */

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
