const Category = require('../models/addcategory');

// POST /api/categories — Add a new category
const addCategory = async (req, res) => {
   
  const { category_name } = req.body;

  try { 
    const newCategory = new Category({ name:category_name }); // status will default to 1
    const saved = await newCategory.save();
    res.status(201).json({ message: 'Category added', category: saved });
    console.log(res);
  } catch (error) {
    res.status(500).json({ message: 'Error adding category111', error });
  }
};

// GET /api/categories — Fetch all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};
const categoryupd=async(req,res)=>{
  const cid=req.params.id;
   try {
  const categories = await Category.findOne({ _id: cid });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

const updecategory = async (req, res) => {
  try {
    const cid = req.params.id;
    const { category_name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      cid,
      { name:category_name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating category', error });
  }
};
const deleteCategory = async(req,res)=>{
  const { id } = req.params;

  try {
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully', category: deleted });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Error deleting category', error });
  }
};

module.exports = {
  addCategory,
  getCategories,
  categoryupd,
  updecategory,
  deleteCategory
};
