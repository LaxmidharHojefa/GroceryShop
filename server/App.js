const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const connectDb = require("./src/config/db");

const userRoutes = require("./src/routes/auth.routes");
const categoryRoutes = require("./src/routes/category.routes");
const productRoutes = require("./src/routes/product.routes");

connectDb(); 

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,               // Required for cookies/sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.send("User API running");
});

module.exports = app;



