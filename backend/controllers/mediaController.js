const Media = require('../models/mediaModel');
 require('../models/product');

const uploadMedia = async (req, res) => {
  try {
    const productId = req.body.productId;
    //   const mediaType = req.query.type;
    const mediaType = req.body.type;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

   // const savedMedia = [];
     const fullImagePath = req.files.map(file => `http://192.168.9.115:5000/${file.path}`);
     const media = new Media({
        productId: productId,
        mediaType: mediaType,
        filePath: fullImagePath,
      });
   
      await media.save();
     // savedMedia.push(media);
      res.status(200).json({
      message: 'Files uploaded successfully'
    });
    
    } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
};
// const uploadMedia = async (req, res) => {
//   try {
//     const productId = req.body.productId;
//     const mediaType = req.body.type;

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: 'No files uploaded' });
//     }

//     // Map all uploaded files to their URLs
//     const filePaths = req.files.map(file => `http://192.168.9.115:5000/uploads/${file.path}`);

//     // Create one Media document with all file paths
//     const media = new Media({
//          productId: productId,
//          mediaType: mediaType,
//          filePath: filePaths,
//     });

//     await media.save();

//     res.status(200).json({
//       message: 'Files uploaded successfully',
//       media
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };


const viewMedia = async (req, res) => {
  try {
    const medialist = await Media.find().populate('productId', 'productname').exec();
    res.status(200).json(medialist);
  } catch (error) {
    res.status(500).json({ message: 'Error to fetching media', error: error.message })
  }
};
const singleMedia = async (req, res) => {
  const id = req.params.id;
  try {
    const siglemediapro = await Media.findOne({ _id: id }).populate('productId', 'productname').exec();
    res.status(200).json(siglemediapro);
  }
  catch (error) {
    res.status(500).json({ message: 'Error to get media', error: error.message });
  }
};
const updateMedia = async (req, res) => {
  const id = req.params.id;
  const { type, productId } = req.body;

  try {
    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    const updateFields = {
      productId,
      mediaType: type,
    };

    if (req.files && req.files.length > 0) {
      const newFilePaths = req.files.map(file =>
        `http://192.168.9.115:5000/${file.path.replace(/\\/g, '/')}`
      );

      // Append new files to existing filePath array
      updateFields.filePath = [...media.filePath, ...newFilePaths];
    }

    // Update and return new document
    const updatedMedia = await Media.findByIdAndUpdate(id, updateFields, { new: true });

    res.status(200).json({
      message: 'Media updated successfully',
      media: updatedMedia,
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Error updating media', error: error.message });
  }
};


const deleteMedia = async (req,res) => {
    const { id } = req.params;

  try {
    const deleted = await Media.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.json({ message: 'Media deleted successfully', category: deleted });
  } catch (error) {
    console.error('Error deleting Media:', error);
    res.status(500).json({ message: 'Error deleting Media', error });
  }

}


module.exports = {
  uploadMedia,
  viewMedia,
  singleMedia,
  updateMedia,
  deleteMedia
};
