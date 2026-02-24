const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));