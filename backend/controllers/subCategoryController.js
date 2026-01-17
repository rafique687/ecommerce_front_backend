const sbCategory = require('../models/SubCategoryAdd');
const Category = require('../models/addcategory');

// POST /api/categories — Add a new category
const saddCategory = async (req, res) => {
   
  const { category,subcategory } = req.body;

  try {  
    const newSubCategory = new sbCategory({ categoryid:category,subcategory:subcategory });
    const saved = await newSubCategory.save();
    res.status(201).json({ message: 'Sub Category added', subcategory: saved });
    console.log(res);
  } catch (error) {
    res.status(500).json({ message: 'Error adding category', error });
  }
};

// GET /api/categories — Fetch all categories
const sgetCategories = async (req, res) => {

  try { 
        
  const categories = await sbCategory.find().populate({
  path: "categoryid",
  select: "name"
});
   
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories...', error });
  }

};
 const getSubcategoriesByCategoryId = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const subcategories = await sbCategory.find({ categoryid: categoryId });
    res.json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching subcategories' });
  }
};

 const singlesubcategory = async (req, res) => {
  const categoryId = req.params.singleid;
  console.log(categoryId);
  try {
    const subcategories = await sbCategory.findOne({ _id: categoryId });
      console.log(subcategories);
    res.json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching subcategories' });
  }
};
const updateSubcategory = async(req,res)=>{
   try {
    const cid = req.params.id;
    
    const { category,subcategory } = req.body;
//console.log('idss',category,subcategory);
    const updatedCategory = await sbCategory.findByIdAndUpdate(
      cid,
      { categoryid:category,subcategory:subcategory },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Sub Category not found' });
    }

    res.json({ message: 'Sub Category updated successfully', category: updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating Sub category', error });
  }};

  const deleteSubCategory = async(req,res)=>{
      const { id } = req.params;
   console.log(id);
  try {
    const deleted = await sbCategory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Sub Category not found' });
    }

    res.json({ message: 'Sub Category deleted successfully', category: deleted });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Error deleting category', error });
  }
  }





module.exports = {
  saddCategory,
  sgetCategories,
  getSubcategoriesByCategoryId,
  singlesubcategory,
  updateSubcategory,
  deleteSubCategory
  
 
};
