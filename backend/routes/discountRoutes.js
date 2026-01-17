const express =require('express');
const router = express.Router();
const {addDicount,viewDiscount,singleDiscount,discountUpdate,deleteDiscount }=require('../controllers/dicountControl');

router.post('/add', addDicount);
router.get('/view',viewDiscount);
router.get('/single/:id',singleDiscount);
router.put('/update/:id',discountUpdate);
router.delete('/delete/:id',deleteDiscount);
module.exports = router;
