const DisplayProductsmodel = require('../models/product');
require('../models/SubCategoryAdd');




// GET /api/categories — Fetch all categories
const displayProducts = async (req, res) => {
  try { 
    const producslist = await DisplayProductsmodel.find();
    console.log(producslist);
    res.status(200).json(producslist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};
const singleProduct = async (req, res) => { 
  const pid = req.params.productId;
  //console.log("productidd..", pid);
  try {
    //const singleProd = await DisplayProductsmodel.findOne({ _id: pid });
    const singleProd = await DisplayProductsmodel.findOne({ _id: pid }).populate('subcategory_id','subcategory');
    console.log(singleProd);
    if (!singleProd) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product fetched', product: singleProd });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

module.exports = {
  displayProducts,
  singleProduct
};
