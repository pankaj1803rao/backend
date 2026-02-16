const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createproduct,
  getproduct,
  deleteproduct,
  updateproduct,
  getsingleproduct,
} = require("../controllers/productcontroller");

router.post("/createproduct", auth, createproduct);
router.get("/", getproduct);
router.get("/singleproduct/:id", auth, getsingleproduct);
router.delete("/delete/:id", auth, deleteproduct);
router.put("/update/:id", auth, updateproduct);

// http://127.0.0.1:7777/api/createproduct
// http://127.0.0.1:7777/api

module.exports = router;
