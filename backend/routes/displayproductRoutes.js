const express = require('express');
const router = express.Router();
const {
 
  displayProducts,
  singleProduct
  
} = require('../controllers/displayProductController');




// GET route
router.get('/', displayProducts);

router.get('/:productId', singleProduct);


module.exports = router;
