 const { collection } = require('../models/addcategory');
const Collection = require('../models/collectionModel');
 const addCollection = async(req,res) => {
      try{
        // const { name,description, type}=req.body;
        // const insertColloection = new Collection({ name:name,description:description,type:type});
        // const saveCollection = await insertColloection.save();
         const { name, description, type, productIds, rules } = req.body;
         const newCollection = new Collection({
             name:name,
            description:description,
            type:type,
            productIds: type === 'manual' ? productIds : [],
            rules: type === 'rule-based' ? rules : []
            });

    await newCollection.save();
        res.status(200).json({message:"Collection  successfully Stored",collection : newCollection});
      }
    catch(error)
    { 
        res.status(500).json({ message:"Eroro to store Collection",error:error.message})
    }

 };
const viewCollection = async (req, res) => {
  try {
    const collections = await Collection.find();  // ← await the result
    res.status(200).json(collections);        // ← return plain data
  } catch (error) {
    res.status(500).json({
      message: "Problem to fetch Collection",
      error: error.message
    });
  }
};
const singlecollection = async (req, res) => {
  const id = req.params.id;
  try {
    const collection = await Collection.findOne({ _id: id });
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({
      message: "Problem to fetch Collection",
      error: error.message,
    });
  }
};
 const updateCollection = async (req, res) => {
  const id = req.params.id;
  try {
    const { name, description, type, productIds, rules } = req.body;

    // Prepare update data based on type
    const updateData = {
      name,
      description,
      type,
      productIds: type === 'manual' ? productIds : [],
      rules: type === 'rule-based' ? rules : []
    };

    // Find the collection by ID and update it
    const updatedCollection = await Collection.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCollection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json({
      message: "Collection successfully updated",
      collection: updatedCollection
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating collection",
      error: error.message
    });
  }
};

 const deleteCollection = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deleted = await Collection.findByIdAndDelete({_id:id});

    if (!deleted) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting collection", error: error.message });
  }
};

 module.exports ={
     addCollection,
     viewCollection,
     updateCollection,
     deleteCollection,
     singlecollection
 }