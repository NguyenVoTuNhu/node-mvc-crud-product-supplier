const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { body } = require('express-validator');

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
