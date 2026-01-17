const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post('/', upload.single('image'), productController.addProduct);

router.put('/update/:id', upload.single('image'), productController.updateProduct);


router.post('/import-excel', upload.single('file'), productController.importExcel);


router.get('/export-excel', productController.exportProductsToExcel);
//router.delete('/:id', productController.deleteProduct);
router.delete('/deleteProduct/:prod_id', productController.deleteProduct);
router.get('/varriant/',productController.variantWiseStock);


module.exports = router;
