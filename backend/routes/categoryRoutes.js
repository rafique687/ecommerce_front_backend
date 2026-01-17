const express = require('express');
const router = express.Router();
const {
    addCategory,
    getCategories,
    categoryupd,
    updecategory,
    deleteCategory
} = require('../controllers/categoryController');

// POST route
router.post('/', addCategory);

// GET route
router.get('/', getCategories);
router.get('/:id', categoryupd);
router.put('/:id',updecategory);
router.delete('/:id', deleteCategory);

module.exports = router;
