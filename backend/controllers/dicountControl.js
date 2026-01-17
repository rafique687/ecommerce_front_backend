const { model } = require('mongoose');
const Discount =require('../models/discoutModel');
require('../models/product');

const addDicount = async (req, res) =>{
    try{
        const { min_qty,end_date,product_id,start_date,type,value}=req.body;
        const add_dsc = new Discount({ product_id:product_id,type:type,value:value,start_date:start_date,end_date:end_date,min_qty:min_qty});
        const save =await add_dsc.save();
        res.status(201).json({ message:"Discount Added"});

    }catch(error){
        res.status(500).json({ message :'Error to Add Discount',error:error.message})
    }};

    const viewDiscount = async (req,res) =>{
    try{
        const discount =await Discount.find().populate('product_id','productname').exec();
        res.status(200).json(discount);
     }catch(error){
        res.status(500).json({ message:'Error to Fetch Discount', error:error.message});
     }
    }
    const singleDiscount = async (req,res)=>{
        const id =req.params.id;
        try{
            const singleprod = await Discount.findOne({ _id :id});
            res.status(200).json(singleprod);
        }
        catch(error){ 
            res(500).json({message:'Errot to fetch Record', error:error.message})
        }
    };
    const discountUpdate = async (req,res)=>{
      
        const id = req.params.id;
        try{
        const { min_qty,end_date,product_id,start_date,type,value}=req.body;
        const upddc = await Discount.findByIdAndUpdate(
      id,
      { product_id:product_id,type:type,value:value,start_date:start_date,end_date:end_date,min_qty:min_qty },
      { new: true }
    );
    if(!upddc)
    {
        res.status(404).json({ message : "Discount Not Found"})
    }
    res.status(200).json({ message:"Discound Updated"});
}
catch(error){
    res.status(500).json({message:'Error to Update Discount',error:error.message});
}
    };
    const deleteDiscount =async (req,res)=>{
          const { id } = req.params;
  try {
    const deleted = await Discount.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Discount not found' });
    }

    res.json({ message: 'Discount deleted successfully', category: deleted });
  } catch (error) {
    console.error('Error deleting Discount:', error);
    res.status(500).json({ message: 'Error deleting Discount', error });
  }
    }

module.exports ={
    addDicount,
    viewDiscount,
    singleDiscount,
    discountUpdate,
    deleteDiscount
}