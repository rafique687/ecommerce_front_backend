const Product = require('../models/product');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const { param } = require('../routes/categoryRoutes');
const product = require('../models/product');

// POST /api/product — Add a new product
const addProduct = async (req, res) => {
  const { categoryid, subcategoryid, productname, description, price, productSize, productColor, stock,metaTitle,metaDescription,urlSlug,status,tieredPricing
 } = req.body;

    // Image from multer
  const image = req.file ? req.file.filename : null;

  if (!image) {
    return res.status(400).json({ message: 'Image is required' });
  }
  const fullImagePath = `http://127.0.0.1:5000/uploads/${image}`;
  // -------------------------------------------------------------------------------
    if (tieredPricing) {
      // If tieredPricing is a string (JSON), parse it
      if (typeof tieredPricing === 'string') {
        parsedTieredPricing = JSON.parse(tieredPricing);
      } else {
        parsedTieredPricing = tieredPricing;
      }

      // Convert string numbers to actual numbers
      parsedTieredPricing = parsedTieredPricing.map((item) => ({
        minQty: Number(item.minQty),
        maxQty:item.maxQty === null || item.maxQty === 'null'? null : Number(item.maxQty),
        price: Number(item.price),
      }));
    }

  //--------------------------------------------------------------------------------
  try {
    const newProduct = new Product({
      categoryid: categoryid,
      subcategory_id: subcategoryid,
      image: fullImagePath,
      productname: productname,
      product_size: productSize,
      product_color: productColor,
      product_stock: stock,
      description: description,
      price: price,
      meta_Title:metaTitle,
      meta_Description:metaDescription,
      url_Slug:urlSlug,
      status:status,
      tieredPricing:parsedTieredPricing


    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: '✅ Product added successfully!',
      product: savedProduct
    });
  } catch (error) {
    console.error('❌ Error saving product:', error);
    res.status(500).json({ message: '❌ Error adding product', error });
  }
};


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { categoryid, subcategoryid, productname, description, price, productSize, productColor, stock,metaTitle,metaDescription,slug,status,tieredPricing  } = req.body;

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (req.file) {
      // Optional: delete old image file
      if (existingProduct.image) {
        const oldImagePath = path.join(__dirname, '../uploads', existingProduct.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.log('Failed to delete old image:', err.message);
        });
      }
    }
     // -------------------------------------------------------------------------------
    if (tieredPricing) {
      // If tieredPricing is a string (JSON), parse it
      if (typeof tieredPricing === 'string') {
        parsedTieredPricing = JSON.parse(tieredPricing);
      } else {
        parsedTieredPricing = tieredPricing;
      }

      // Convert string numbers to actual numbers
      parsedTieredPricing = parsedTieredPricing.map((item) => ({
        minQty: Number(item.minQty),
        maxQty:
          item.maxQty === null || item.maxQty === 'null'
            ? null
            : Number(item.maxQty),
        price: Number(item.price),
      }));
    }

  //--------------------------------------------------------------------------------
    // Build update object
    var updateData = {};
    if (req.file) {
      const image = req.file ? req.file.filename : null;
      const fullImagePath = `http://127.0.0.1:5000/uploads/${image}`;
      updateData = {
        categoryid: categoryid,
        subcategory_id: subcategoryid,
        image: fullImagePath,
        productname: productname,
        product_size: productSize,
        product_color: productColor,
        product_stock: stock,
        description: description,
        price: price,
        meta_Title:metaTitle,
        meta_Description:metaDescription,
        url_Slug:slug,
        status:status,
        tieredPricing:parsedTieredPricing
      };
    }
    else {
       updateData = {
        categoryid: categoryid,
        subcategory_id: subcategoryid,
        productname: productname,
        product_size: productSize,
        product_color: productColor,
        product_stock: stock,
        description: description,
        price: price,
        status:status,
        tieredPricing:parsedTieredPricing
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};
const importExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;

    // Read Excel file
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    console.log('Excel Data:', data);

    // Insert products into DB

    const baseUrl = 'http://127.0.0.1:5000/uploads/';
    for (const item of data) {
      //  const imageName = item.image;  // assuming Excel has a column 'image' with filenames
      //  const fullImagePath = imageName ? baseUrl + imageName : null;
      const newProduct = new Product({
        categoryid: item.categoryid,
        subcategory_id: item.subcategoryid,
        productname: item.productname,
        description: item.description,
        price: item.price,
        product_stock: item.stock,
        product_size: item.productSize,
        product_color: item.productColor,
        image: 'fullImagePath',  // If you want to handle images, you may need a different approach
      });

      await newProduct.save();
    }

    // Delete the uploaded Excel file from server after processing
    fs.unlinkSync(filePath);

    res.status(200).json({ message: 'Products imported successfully' });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ message: 'Import failed', error: error.message });
  }
};


// const importExcel = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const filePath = req.file.path;
//     const workbook = XLSX.readFile(filePath);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = XLSX.utils.sheet_to_json(sheet);

//     const baseUrl = 'http://192.168.9.115:5000/uploads/';

//     const skipped = [];
//     const savedProducts = [];

//     for (const item of data) {
//       try {
//         const imageName = item.image?.trim();

//         if (!imageName) {
//           skipped.push(item.productname || 'Unnamed Product');
//           continue; // Skip if no image
//         }

//         const fullImagePath = baseUrl + imageName;

//         // Create a new product instance
//         const newProduct = new Product({
//           categoryid: item.categoryid,
//           subcategory_id: item.subcategoryid,
//           productname: item.productname,
//           description: item.description,
//           price: item.price,
//           product_stock: item.stock,
//           product_size: item.productSize,
//           product_color: item.productColor,
//           image: fullImagePath,
//         });

//         // Save to DB
//         const saved = await newProduct.save();
//         savedProducts.push(saved);
//       } catch (recordError) {
//         console.error(`Failed to save product: ${item.productname}`, recordError.message);
//         skipped.push(item.productname || 'Unnamed Product (error)');
//       }
//     }

//     // Delete uploaded file
//     fs.unlinkSync(filePath);

//     res.status(200).json({
//       message: 'Import complete',
//       importedCount: savedProducts.length,
//       skippedProducts: skipped,
//     });
//   } catch (error) {
//     console.error('Import error:', error);
//     res.status(500).json({ message: 'Import failed', error: error.message });
//   }
// };


const variantWiseStock = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: {
            productname: "$productname",
            color: "$product_color",
            size: "$product_size"
          },
          totalStock: { $sum: "$product_stock" }
        }
      },
      {
        $project: {
          _id: 0,
          productname: "$_id.productname",
          color: "$_id.color",
          size: "$_id.size",
          totalStock: 1
        }
      },
      {
        $sort: { productname: 1, color: 1, size: 1 }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({ message: "Failed to get stock by product, color and size", error: error.message });
  }
};



const exportProductsToExcel = async (req, res) => {
  try {
    const products = await Product.find();

    // Format data
    const data = products.map(prod => ({
      categoryid: prod.categoryid,
      subcategoryid: prod.subcategory_id,
      productname: prod.productname,
      description: prod.description,
      price: prod.price,
      stock: prod.product_stock,
      productSize: prod.product_size,
      productColor: prod.product_color,
      image: prod.image,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

    // Write to buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Set headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    console.error('Excel export error:', error);
    res.status(500).json({ message: 'Failed to export products', error: error.message });
  }
};
const deleteProduct = async( req,res)=>{ 
  const {prod_id} = req.params;
   try {
    const deleted = await Product.findByIdAndDelete(prod_id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', Product: deleted });
  } catch (error) {
    console.error('Error deleting Product:', error);
    res.status(500).json({ message: 'Error deleting Product', error });
  }
}
module.exports = {
  addProduct,
  updateProduct,
  importExcel,
  exportProductsToExcel,
  deleteProduct,
  variantWiseStock
};
