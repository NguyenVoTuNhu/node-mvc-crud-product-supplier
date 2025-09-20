const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { body } = require('express-validator');

/**
 * @swagger
 * /suppliers:
 *   get:
 *     tags: [Suppliers]
 *     summary: Hiển thị trang danh sách nhà cung cấp (Web)
 *     responses:
 *       200:
 *         description: Trang danh sách nhà cung cấp
 *
 *   post:
 *     tags: [Suppliers]
 *     summary: Tạo nhà cung cấp mới (Web form)
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nhà cung cấp được tạo thành công
 */

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     tags: [Suppliers]
 *     summary: Hiển thị chi tiết nhà cung cấp (Web)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết nhà cung cấp
 *
 *   put:
 *     tags: [Suppliers]
 *     summary: Cập nhật nhà cung cấp
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
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *
 *   delete:
 *     tags: [Suppliers]
 *     summary: Xóa nhà cung cấp
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
 *   name: Suppliers
 *   description: Supplier management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         phone:
 *           type: string
 *       required:
 *         - name
 */

/**
 * @swagger
 * /suppliers/api:
 *   get:
 *     tags: [Suppliers]
 *     summary: Get list of suppliers (JSON)
 *     responses:
 *       200:
 *         description: list of suppliers
 */
router.get('/api', async (req, res) => {
  const Supplier = require('../models/supplier');
  const list = await Supplier.find().sort({ createdAt: -1 });
  res.json(list);
});

// Web pages
router.get('/', supplierController.index);
router.get('/new', supplierController.newForm);
router.post('/', body('name').notEmpty().withMessage('Name is required'), supplierController.create);
router.get('/:id', supplierController.show);
router.get('/:id/edit', supplierController.editForm);
router.put('/:id', body('name').notEmpty().withMessage('Name is required'), supplierController.update);
router.delete('/:id', supplierController.delete);

module.exports = router;
