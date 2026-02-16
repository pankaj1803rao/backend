const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
  register,
  login,
  logout,
  getUserProdfile,
} = require("../controllers/userControllers");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getusers", auth, getUserProdfile);

module.exports = router;
