const jwt = require("jsonwebtoken");
const User = require("../models/userSchem");
const bcrypt = require("bcrypt");
const Session = require("../models/seesion");

const register = async (req, res) => {
  try {
    // const user = new User(req.body);
    const { name, email, password, userName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const newuser = await user.save();
    res.status(201).json({
      message: "User created||Registered successfully",
      data: newuser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bad request", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ FIX 1: if user not found, return before bcrypt.compare
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const ispasswordmatch = await bcrypt.compare(password, user.password);
    if (!ispasswordmatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // const token = jwt.sign({ id: user._id }, "abc1212334fsf", {
    //   expiresIn: "1h",
    // });

    const session = await Session.create({ userId: user._id });

    res.cookie("token", session.id, {
      httpOnly: true, // docum
      maxAge: 1000 * 60 * 60 * 24 * 7,
      // sameSite: "lax",
      // secure: false, // ✅ true in https
      sameSite: "lax", // for localhost
      secure: false, // localhost only
    });

    // ✅ FIX 2: DO NOT send token in response (cookie already has it)
    return res.status(200).json({
      message: "User login successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Bad request", message: error.message });
  }
};

const getUserProdfile = async (req, res) => {
  try {
    // console.log(req.user);
    const user = await User.findById(req.user._id).select("-password -__v");

    // console.log(user);
    res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(201).json({
      message: "User logout successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bad request", message: error.message });
  }
};

// const forgetpassword = (req, res) => {

// }

// const updatepassword = (req, res) => {

// }

// const sendotpnumber = (req, res) => {

// }

module.exports = { register, login, logout, getUserProdfile };
