const express = require('express');
const router = express.Router();
const { addCollection,viewCollection,updateCollection,deleteCollection,singlecollection}=require('../controllers/collectionControl');
const { collection } = require('../models/addcategory');

router.post('/addcollection',addCollection);
router.get('/viewCollection',viewCollection);
router.get('/single/:id',singlecollection);
router.put('/update/:id',updateCollection);
router.delete('/delete/:id',deleteCollection);

module.exports=router;