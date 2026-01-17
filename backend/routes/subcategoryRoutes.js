const express = require('express');
const router = express.Router();
const {
  saddCategory,
  sgetCategories,
  getSubcategoriesByCategoryId,
  singlesubcategory,
  updateSubcategory,
  deleteSubCategory
  
} = require('../controllers/subCategoryController');

// POST route
router.post('/', saddCategory);

// GET route
router.get('/all', sgetCategories);

router.get('/:id', getSubcategoriesByCategoryId);
//router.get('/:singleid',singlesubcategory);
router.get('/single/:singleid', singlesubcategory);
router.put('/:id',updateSubcategory);
router.delete('/:id', deleteSubCategory);

module.exports = router;
