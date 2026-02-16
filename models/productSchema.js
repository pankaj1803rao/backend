const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [8, "Name must be at least 8 characters"],
      maxlength: 20,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be greater than 0"],
      max: [10000, "Price must be less than 10000"],
    },
    image: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/150",
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Product name is required"],
//       minlength: [3, "Name must be at least 3 characters"],
//       maxlength: [60, "Name must be at most 60 characters"],
//       trim: true,
//       index: true,
//     },

//     price: {
//       type: Number,
//       required: [true, "Price is required"],
//       min: [0, "Price must be >= 0"],
//       max: [100000, "Price must be <= 100000"],
//     },

//     image: {
//       type: String,
//       default: "https://via.placeholder.com/150",
//       trim: true,
//       match: [/^https?:\/\/.+/i, "Image must be a valid URL"],
//     },

//     description: {
//       type: String,
//       required: [true, "Description is required"],
//       trim: true,
//       minlength: [10, "Description must be at least 10 characters"],
//       maxlength: [2000, "Description must be at most 2000 characters"],
//     },

//     category: {
//       type: String,
//       required: [true, "Category is required"],
//       trim: true,
//       lowercase: true,
//       enum: {
//         values: ["electronics", "fashion", "books", "home", "grocery", "other"],
//         message: "Invalid category",
//       },
//     },

//     quantity: {
//       type: Number,
//       required: true,
//       min: [0, "Quantity cannot be negative"],
//       default: 0,
//     },

//     rating: {
//       type: Number,
//       min: [0, "Rating must be between 0 and 5"],
//       max: [5, "Rating must be between 0 and 5"],
//       default: 0,
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//       index: true,
//     },

//     isDeleted: {
//       type: Boolean,
//       default: false,
//       index: true,
//     },
//   },
//   { timestamps: true },
// );

// // Hide internal fields by default
// productSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     delete ret.__v;
//     return ret;
//   },
// });

// module.exports = mongoose.model("Product", productSchema);
