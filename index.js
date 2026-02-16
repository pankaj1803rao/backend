require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const db = require("./config/dbconnection");
const productRoutes = require("./routes/productRoutes");
const usersRoutes = require("./routes/userRoutes");

const port = 7777;
const hostname = "0.0.0.0";
// http://localhost:7777
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);

db().then(() => {
  console.log("Database connected");
  app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
  });
});
