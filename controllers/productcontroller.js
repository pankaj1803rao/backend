const Product = require("../models/productSchema");

/// create product
const createproduct = async (req, res) => {
  // console.log(req.body);
  try {
    const product = new Product(req.body);
    console.log(product);

    const newproduct = await product.save();

    res.status(201).send(newproduct);
  } catch (error) {
    // res.status(400).send(error.errors.name.properties.message);
    res.status(400).json({ error: "Bad request", message: error.message });
  }
};
// http://127.0.0.1:7777/api/products/createproduct
// get  all product
const getproduct = async (req, res) => {
  // console.log(req.body);
  const getproduct1 = await Product.find();
  res.send(getproduct1);
};
//http://127.0.0.1:7777/api/products
// get single product
const getsingleproduct = async (req, res) => {
  const getproduct1 = await Product.findById(req.params.id);
  res.send(getproduct1);
};
//http://127.0.0.1:7777/api/products/singleproduct/123
// delete product
const deleteproduct = async (req, res) => {
  // console.log(req.id);
  // console.log(req.params.id);
  const deleteproduct1 = await Product.findByIdAndDelete(req.params.id);
  res.send(deleteproduct1);
};
// update product
const updateproduct = async (req, res) => {
  const updateproduct1 = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true, //updated data show in respose
    }
  );
  res.send(updateproduct1);
};




// module.exports=createproduct,
module.exports = {
  createproduct,
  getproduct,
  deleteproduct,
  updateproduct,
  getsingleproduct,
};

// const Product = require("../models/productSchema");
// const {
//   createProductSchema,
//   updateProductSchema,
// } = require("../validations/product.validation");

// const sendZodError = (res, err) => {
//   return res.status(400).json({
//     error: "Validation failed",
//     details: err.errors?.map((e) => ({
//       path: e.path.join("."),
//       message: e.message,
//     })),
//   });
// };

// // ✅ Create Product (validated + allowlist)
// const createproduct = async (req, res) => {
//   try {
//     const payload = createProductSchema.parse(req.body); // ✅ strict validation

//     // ✅ allowlist insert only validated fields
//     const product = await Product.create(payload);

//     return res.status(201).json(product);
//   } catch (error) {
//     if (error?.name === "ZodError") return sendZodError(res, error);
//     return res
//       .status(400)
//       .json({ error: "Bad request", message: error.message });
//   }
// };

// // ✅ Get all products (safe filtering + limit)
// const getproduct = async (req, res) => {
//   try {
//     // optional query controls
//     const limit = Math.min(parseInt(req.query.limit || "100", 10), 200);
//     const page = Math.max(parseInt(req.query.page || "1", 10), 1);
//     const skip = (page - 1) * limit;

//     const products = await Product.find({ isDeleted: false })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .select("-__v");

//     return res.json(products);
//   } catch (e) {
//     return res.status(500).json({ error: "Server error", message: e.message });
//   }
// };

// // ✅ Get single product (safe + 404)
// const getsingleproduct = async (req, res) => {
//   try {
//     const product = await Product.findOne({
//       _id: req.params.id,
//       isDeleted: false,
//     }).select("-__v");

//     if (!product) return res.status(404).json({ error: "Product not found" });
//     return res.json(product);
//   } catch (e) {
//     return res
//       .status(400)
//       .json({ error: "Invalid product id", message: e.message });
//   }
// };

// // ✅ Soft delete (safer than permanent delete)
// const deleteproduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       { isDeleted: true, isActive: false },
//       { new: true },
//     );

//     if (!product) return res.status(404).json({ error: "Product not found" });
//     return res.json({ message: "Deleted ✅", product });
//   } catch (e) {
//     return res
//       .status(400)
//       .json({ error: "Invalid product id", message: e.message });
//   }
// };

// // ✅ Update (validated + runValidators + allowlist)
// const updateproduct = async (req, res) => {
//   try {
//     const payload = updateProductSchema.parse(req.body); // ✅ strict update validation

//     if (Object.keys(payload).length === 0) {
//       return res.status(400).json({ error: "No valid fields to update" });
//     }

//     const updated = await Product.findOneAndUpdate(
//       { _id: req.params.id, isDeleted: false },
//       payload,
//       {
//         new: true,
//         runValidators: true, // ✅ run mongoose validators on update
//         context: "query",
//       },
//     ).select("-__v");

//     if (!updated) return res.status(404).json({ error: "Product not found" });
//     return res.json(updated);
//   } catch (error) {
//     if (error?.name === "ZodError") return sendZodError(res, error);
//     return res
//       .status(400)
//       .json({ error: "Bad request", message: error.message });
//   }
// };

// module.exports = {
//   createproduct,
//   getproduct,
//   deleteproduct,
//   updateproduct,
//   getsingleproduct,
// };
